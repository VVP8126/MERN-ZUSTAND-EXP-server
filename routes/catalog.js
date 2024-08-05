const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookinstanceController = require('../controllers/bookinstanceController');

const { validateGenre } = require('../utils/validation/validators/genreValidator');

// Books
router.get('/book/author', bookController.getBooksByAuthor);
router.get('/book/genre', bookController.getBooksByGenre);
router.get('/book/list', bookController.getBookList);
router.get('/book/count', bookController.countBooks);
router.get('/book/:id', bookController.getBookById);
router.post('/book', bookController.createBook);

// BookInstance
router.get('/book_instance/book', bookinstanceController.getBookInstanceByBookId);
router.get('/book_instance/list', bookinstanceController.getBookInstanceList);
router.get('/book_instance/count', bookinstanceController.countBookInstances);
router.get('/book_instance/:id', bookinstanceController.getBookInstanceById);
router.post('/book_instance', bookinstanceController.createBookInstance);

// Author
router.get('/author/list', authorController.getAuthorList);
router.get('/author/count', authorController.countAuthors);
router.get('/author/:id', authorController.getAuthorById);
router.post('/author', authorController.createAuthor);

// Genre
router.get('/genre', genreController.getGenreDetails);
router.get('/genre/list', genreController.getGenreList);
router.get('/genre/count', genreController.countGenres);
router.post('/genre', validateGenre(), genreController.createGenre);
router.delete('/genre/delete/:id', genreController.deleteGenre);
router.patch('/genre/:id', validateGenre(), genreController.updateGenre);

module.exports = router;
