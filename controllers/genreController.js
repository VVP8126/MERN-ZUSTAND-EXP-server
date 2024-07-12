const Genre = require('./../models/genre');

exports.createGenre = async function (req, res) {
  try {
    const doc = new Genre({ name: req.body.name });
    const genre = await doc.save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Genre' });
  }
};

exports.getGenreList = async function (req, res) {
  try {
    const genres = await Genre.find().exec();
    res.json(genres);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about Genres' });
  }
};

exports.countGenres = async function (req, res) {
  try {
    const genresCount = await Genre.countDocuments({}).exec();
    res.json({ count: genresCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count Genres count in a base' });
  }
};
