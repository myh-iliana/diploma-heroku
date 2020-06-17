const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const officegen = require('officegen');
const fs = require('fs');
const json2xls = require('json2xls');

const authenticateToken = require('../utils');
const validations = require('./validations');
const User = require('../models').User;
const Monograph = require('../models').Monograph;
const Periodicity = require('../models').Periodicity;
const Thesis = require('../models').Thesis;
const includePostsWithUsers = [
  {
    model: Periodicity,
    include: [{
      model: User,
      attributes: ['username', 'id']
    }],
  },
  {
    model: Monograph,
    include: [{
      model: User,
      attributes: ['username', 'id']
    }],
  },
  {
    model: Thesis,
    include: [{
      model: User,
      attributes: ['username', 'id']
    }],
  }
];
const includePosts = [
  {
    model: Periodicity,
  },
  {
    model: Monograph,
  },
  {
    model: Thesis,
  }
];

/* GET main user. */
router.get('/account', authenticateToken, function (req, res, next) {
  User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
    include: includePostsWithUsers,
  })
    .then(async (user) => {
      if (user === null) res.status(404).send('Cannot find user');

      res.send(user.get());
    })
    .catch((err) => console.log('========', err));
});

router.get('/downloadPosts/:id', function (req, res, next) {
  let docx = officegen('docx');

  docx.on('finalize', function(written) {
    console.log(
      'Finish to create a Microsoft Word document.'
    )
  });

  docx.on('error', function(err) {
    console.log(err)
  });

  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
    include: includePostsWithUsers,
  })
    .then(async (user) => {
      if (user === null) res.status(404).send('Cannot find user');

      let docxP = docx.createP();
      let out = fs.createWriteStream(`./uploads/${user.username}.docx`);

      const periodicities = user.Periodicities;
      const monographs = user.Monographs;
      const thesis = user.Theses;

      docxP.addText('Periodicity ', { bold: true, font_size: 20 });
      docxP.addLineBreak();
      periodicities.forEach((post, i) => {
        docxP.addText(`${i + 1}. ${post.title}.`, { font_size: 16 });
        docxP.addLineBreak();
        const date = new Date(post.createdAt);
        docxP.addText(`Date: ${date.toLocaleString()}`, { font_size: 15, color: '808080' });
        docxP.addLineBreak();
      });

      docxP.addText('Monograph ', { bold: true, font_size: 20 });
      docxP.addLineBreak();
      monographs.forEach((post, i) => {
        docxP.addText(`${i + 1}. ${post.title}.`, { font_size: 16 });
        docxP.addLineBreak();
        const date = new Date(post.createdAt);
        docxP.addText(`Date: ${date.toLocaleString()}`, { font_size: 15, color: '808080' });
        docxP.addLineBreak();
      });

      docxP.addText('Thesis ', { bold: true, font_size: 20 });
      docxP.addLineBreak();
      thesis.forEach((post, i) => {
        docxP.addText(`${i + 1}. ${post.title}.`, { font_size: 16 });
        docxP.addLineBreak();
        const date = new Date(post.createdAt);
        docxP.addText(`Date: ${date.toLocaleString()}`, { font_size: 15, color: '808080' });
        docxP.addLineBreak();
      });

      docx.generate(out, {});

      res.send(`${user.username}.docx`);
    })
    .catch((err) => console.log('========', err));
});

// GET user
router.get('/:username', function (req, res, next) {
  User.findOne({
    where: { username: req.params.username },
    attributes: { exclude: ["password"] },
  })
    .then(async (user) => {
      if (user === null) res.status(404).send('Cannot find user');

      res.send(user.get());
    })
    .catch((err) => console.log('========', err));
});

router.get('/:username/posts', function (req, res, next) {
  User.findOne({
    where: { username: req.params.username },
    attributes: { exclude: ["password"] },
    include: includePostsWithUsers,
  })
    .then(async (user) => {
      if (user === null) res.status(404).send('Cannot find user');

      res.send(user.get());
    })
    .catch((err) => console.log('========', err));
});

// change avatar
router.put('/account/avatar', authenticateToken, function (req, res, next) {
  const { avatar } = req.body;

  User.update({ avatar }, {
    where: { id: req.user.id },
  })
    .then((rows) => {
      if (rows[0] > 0) {
        return User.findOne({
          where: { id: req.user.id },
          attributes: { exclude: ["password"] },
        });
      }

      return res.status(304).send({ error: 'Not edited' });
    })
    .then(user => {
      if (user) {
        return res.send(user.get());
      }

      return res.status(404).send({ error: 'User not found' });
    })
    .catch((err) => console.log(err));
});

// edit user
router.put('/account', [
  validations.fullName,
  validations.username((value, { req }) => {
    if (value !== req.body.currentUsername) {
      return User.findOne({ where: { username: value } }).then(user => {
        if (user) return Promise.reject('Username already in use');
      })
    }
    return true;
  }),
  validations.email((value, { req }) => {
    if (value !== req.body.currentEmail) {
      return User.findOne({ where: { email: value } }).then(user => {
        if (user) return Promise.reject('E-mail already in use');
      })
    }
    return true;
  }),
], authenticateToken, async function (req, res, next) {
  const errors = validationResult(req);
  const { currentUsername, currentEmail, id, ...data } = req.body;

  if (errors.isEmpty()) {
    await User.update(data, {
      where: { id },
    })
      .then((rows) => {
        if (rows[0] > 0) {
          return User.findOne({
            where: { id },
          });
        }

        return res.status(304).send({ error: 'Not edited' });
      })
      .then(user => {
        if (user) {
          const { password, ...rest } = user.get();
          return res.send(rest);
        }

        return res.status(404).send({ error: 'User not found' });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(422).send({ error: errors.array() });
  }
});

// GET all users
router.get('/', function(req, res, next) {
  User.findAll({
    attributes: { exclude: ["password"] },
    include: includePostsWithUsers,
  })
    .then(async users => {
      res.send(users);
    })
    .catch(err => console.log('-----', err))
});

router.delete('/:id', authenticateToken, function (req, res, next) {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Deleted successfully'))
    .catch(err => console.log('----', err));
});

module.exports = router;
