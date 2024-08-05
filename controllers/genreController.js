const Genre = require('./../models/genre');
const Book = require('./../models/book');

const { validationResult } = require('express-validator');

exports.createGenre = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const name = req.body.name.toUpperCase();
    const isGenreInBase = await Genre.findOne({ name }).exec();
    // console.log('isGenreInBase:', JSON.stringify(isGenreInBase));
    if (isGenreInBase) {
      return res.status(403).json({ message: `Genre ${name} allready created` });
    }
    const doc = new Genre({ name });
    const genre = await doc.save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Genre' });
  }
};

exports.deleteGenre = async function (req, res) {
  try {
    const id = req.params.id;
    const isGenreInBase = await Genre.findById(id).exec();
    if (!isGenreInBase) {
      return res.status(404).json({ message: `Genre to delete (ID=${id}) not found !` });
    }
    const hasGenreBooks = await Book.find({ genre: isGenreInBase._id }, 'title').exec();
    if (hasGenreBooks.length) {
      res.status(403).json({
        message: `Impossible to delete genre ${isGenreInBase.name}. Found ${hasGenreBooks.length} of ${isGenreInBase.name} book(s) in catalog`,
      });
    } else {
      const result = await Genre.findByIdAndDelete(id);
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete Genre' });
  }
};

exports.updateGenre = async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const id = req.params.id;
    const name = req.body.name.toUpperCase();
    const isGenreInBase = await Genre.findById(id).exec();
    if (!isGenreInBase) {
      return res.status(404).json({ message: `Genre to update (ID=${id}) not found !` });
    }
    if (isGenreInBase.name === name) {
      return res.status(403).json({ message: `The same name (title) for GENRE (ID=${id})` });
    }
    const hasGenreBooks = await Book.find({ genre: isGenreInBase._id }, 'title').exec();
    if (hasGenreBooks.length) {
      res.status(403).json({
        message: `Impossible to update genre ${isGenreInBase.name}. Found ${hasGenreBooks.length} of ${isGenreInBase.name} book(s) in catalog`,
      });
    } else {
      const result = await Genre.findOneAndUpdate({ _id: id }, { name }, { new: true });
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update Genre' });
  }
};

// setTimeout(async () => { res.status(500).json({ message: 'Failed select all information about Genres' }); }, 3000);
exports.getGenreList = async function (req, res) {
  try {
    const genres = await Genre.find().exec();
    if (!genres) {
      res.status(500).json({ message: 'Failed to get a list of all Genres' });
    } else {
      res.json(genres);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed get Genres List' });
  }
};

exports.getGenreDetails = async function (req, res) {
  try {
    const genreId = req.query.genreId;
    const genre = await Genre.findById(genreId).exec();
    if (!genre) {
      res.status(404).json({ message: `Information about Genre (ID=${genreId}) is absent` });
    } else {
      res.json(genre);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select Genre details' });
  }
};

exports.countGenres = async function (req, res) {
  try {
    const genresCount = await Genre.countDocuments({}).exec();
    if (!genresCount) {
      res.status(500).json({ message: 'Failed to count Genres' });
    } else {
      res.json({ count: genresCount });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count Genres count in a base' });
  }
};
