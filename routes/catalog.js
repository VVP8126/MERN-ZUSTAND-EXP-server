const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookinstanceController = require('../controllers/bookinstanceController');

// Book
router.get('/book', bookController.getBookList);
router.get('/book/count', bookController.countBooks);
router.post('/book', bookController.createBook);

// BookInstance
router.get('/book_instance', bookinstanceController.getBookInstanceList);
router.get('/book_instance/count', bookinstanceController.countBookInstances);
router.post('/book_instance', bookinstanceController.createBookInstance);

// Author
router.get('/author', authorController.getAuthorList);
router.get('/author/count', authorController.countAuthors);
router.post('/author', authorController.createAuthor);

// Genre
router.get('/genre', genreController.getGenreList);
router.get('/genre/count', genreController.countGenres);
router.post('/genre', genreController.createGenre);

module.exports = router;
