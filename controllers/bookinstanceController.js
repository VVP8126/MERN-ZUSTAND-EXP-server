const BookInstance = require('../models/bookInstance');

exports.createBookInstance = async function (req, res) {
  const book = req.body.book;
  const imprint = req.body.imprint;
  const status = req.body.status;
  const dueBack = req.body.dueBack;
  try {
    const params = {
      book,
      imprint,
      status,
      dueBack,
    };
    const doc = new BookInstance(params);
    const instance = await doc.save();
    res.json(instance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new BookInstance' });
  }
};

// setTimeout(async () => { res.status(500).json({ message: 'Failed select all information about Genres' }); }, 3000);
exports.getBookInstanceList = async function (req, res) {
  try {
    const instances = await BookInstance.find().populate('book').exec();
    if (!instances) {
      res.status(404).json({ message: `List of Book Instances empty !` });
    } else {
      res.json(instances);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about BookInstances' });
  }
};

exports.getBookInstanceById = async function (req, res) {
  try {
    const id = req.params.id;
    const instance = await BookInstance.findById(id).populate('book').exec();
    if (!instance) {
      res.status(404).json({ message: `Information about Book Instance ID=${id} not found` });
    } else {
      res.json(instance);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about BookInstances by ID' });
  }
};

exports.getBookInstanceByBookId = async function (req, res) {
  try {
    const bookId = req.query.bookId;
    const instances = await BookInstance.find({ book: bookId }, 'imprint status dueBack').exec();
    if (!instances) {
      res.status(404).json({ message: `Failed to get Book Instances By Book ID=${bookId}` });
    } else {
      res.json(instances);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Failed select all information about BookInstances by BookId' });
  }
};

exports.countBookInstances = async function (req, res) {
  try {
    const instancesCount = await BookInstance.countDocuments({}).exec();
    if (!instancesCount) {
      res.status(404).json({ message: `Failed to count Book Instances` });
    } else {
      res.json({ count: instancesCount });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count BookInstances in a base' });
  }
};
