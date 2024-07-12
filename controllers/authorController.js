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

exports.getAuthorList = async function (req, res) {
  try {
    const authors = await Author.find().exec();
    res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about Authors' });
  }
};

exports.countAuthors = async function (req, res) {
  try {
    const authorsCount = await Author.countDocuments({}).exec();
    res.json({ count: authorsCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed count Authors in a base' });
  }
};
