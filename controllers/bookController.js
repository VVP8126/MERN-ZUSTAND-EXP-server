const Book = require('./../models/book');

exports.createBook = async function (req, res) {
  const title = req.body.title;
  const author = req.body.author;
  const summary = req.body.summary;
  const isbn = req.body.isbn;
  const genre = req.body.genre;
  try {
    const params = {
      title,
      author,
      summary,
      isbn,
      genre,
    };
    const doc = new Book(params);
    const book = await doc.save();
    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create new Book' });
  }
};

// setTimeout(async () => { res.status(500).json({ message: 'Failed select all information about Books' }); }, 3000);
exports.getBookList = async function (req, res) {
  try {
    const books = await Book.find({}, 'title author')
      .populate('author', 'firstName familyName')
      .exec();
    if (!books) {
      res.status(404).json({ message: `Failed to get Book List` });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about Books' });
  }
};

exports.countBooks = async function (req, res) {
  try {
    const booksCount = await Book.countDocuments({}).exec();
    if (!booksCount) {
      res.status(404).json({ message: `Failed to count Books` });
    } else {
      res.json({ count: booksCount });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count Books in a base' });
  }
};

exports.getBooksByAuthor = async function (req, res) {
  try {
    const id = req.query.authorId;
    const books = await Book.find({ author: id }, 'title isbn genre').populate('genre').exec();
    if (!books) {
      res.status(404).json({ message: `Failed to find Books by Author ID=${genreId}` });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch Books by Author' });
  }
};

exports.getBooksByGenre = async function (req, res) {
  try {
    const genreId = req.query.genreId;
    const books = await Book.find({ genre: genreId }, 'title author isbn')
      .populate('author')
      .exec();
    if (!books) {
      res.status(404).json({ message: `Failed to find Books by Genre ID=${genreId}` });
    } else {
      res.json(books);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch Books by Genre' });
  }
};

exports.getBookById = async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('author').populate('genre').exec();
    if (!book) {
      res.status(404).json({ message: `Failed to find Book by ID=${bookId}` });
    } else {
      res.json(book);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get Book information by ID' });
  }
};
