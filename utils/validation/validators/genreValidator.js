const { body } = require('express-validator');

exports.validateGenre = () =>
  body('name', 'Minimal password length is 3 symbols, maximum - 20')
    .trim()
    .isLength({ min: 3, max: 20 });
