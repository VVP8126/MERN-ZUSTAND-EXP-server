const Author = require('../models/author');

exports.createAuthor = async function (req, res) {
  try {
    const params = {
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      birthDate: req.body.birthDate,
      deathDate: req.body.deathDate,
    };
    const doc = new Author(params);
    const author = await doc.save();
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Author' });
  }
};

// setTimeout(async () => { res.status(500).json({ message: 'Failed select all information about Authors' }); }, 3000);
exports.getAuthorList = async function (req, res) {
  try {
    const authors = await Author.find({}, 'firstName familyName').sort({ familyName: 1 }).exec();
    if (!authors) {
      res.status(404).json({ message: `Failed to get Authors list !` });
    } else {
      res.json(authors);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about Authors' });
  }
};

exports.countAuthors = async function (req, res) {
  try {
    const authorsCount = await Author.countDocuments({}).exec();
    if (!authorsCount) {
      res.status(404).json({ message: `Failed to count Authors in base !` });
    } else {
      res.json({ count: authorsCount });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed count Authors in a base' });
  }
};

exports.getAuthorById = async function (req, res) {
  try {
    const id = req.params.id;
    const author = await Author.findById(id).exec();
    if (!author) {
      res.status(404).json({ message: `Information about Author with ID=${id} not found !` });
    } else {
      res.json(author);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed load data about Author' });
  }
};
