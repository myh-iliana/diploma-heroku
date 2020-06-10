const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models').User;
const validations = require('./validations');

router.post('/register', [
  validations.fullName,
  validations.username(value => {
    return User.findOne({ where: { username: value } }).then(user => {
      if (user) return Promise.reject('Username already in use');
    })
  }),
  validations.email((value) => {
    return User.findOne({ where: { email: value } }).then((user) => {
      if (user) return Promise.reject('E-mail already in use');
    });
  }),
  validations.password,
  body('passConfirm').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords don't match");
    return true;
  }),
], function (req, res, next) {
  const { fullName, username, email, password, isTeacher, cathedraId } = req.body;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    User.create({ fullName, username, email, password, isTeacher, isAdmin: false, cathedraId })
      .then(user => res.send({ user }))
      .catch(err => console.log('-------------------------------',err.message));
  } else {
    res.status(422).send({ error: errors.array() });
  }
});

module.exports = router;
