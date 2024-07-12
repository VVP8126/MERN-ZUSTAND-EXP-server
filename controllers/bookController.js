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

exports.getBookList = async function (req, res) {
  try {
    const books = await Book.find().exec();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed select all information about Books' });
  }
};

exports.countBooks = async function (req, res) {
  try {
    const booksCount = await Book.countDocuments({}).exec();
    res.json({ count: booksCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to count Books in a base' });
  }
};
