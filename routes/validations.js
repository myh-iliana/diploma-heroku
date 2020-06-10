const { body } = require('express-validator');

const validations = {
  fullName: body('fullName')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),
  username: (custom) =>
    body('username')
      .isLength({ min: 4 })
      .withMessage('Must be at least 4 characters')
      .custom(custom),
  email: (custom) =>
    body('email')
      .isLength({ min: 4 })
      .isEmail()
      .withMessage('Must be a valid email address')
      .custom(custom),
  password: body('password').isLength({ min: 6 }).withMessage('Must have minimum 6 characters'),
};

module.exports = validations;
