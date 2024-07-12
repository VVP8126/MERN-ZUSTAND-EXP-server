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

exports.getBookInstanceList = async function (req, res) {
  try {
    const instances = await BookInstance.find().exec();
    res.json(instances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about BookInstances' });
  }
};

exports.countBookInstances = async function (req, res) {
  try {
    const instancesCount = await BookInstance.countDocuments({}).exec();
    res.json({ count: instancesCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count BookInstances in a base' });
  }
};
