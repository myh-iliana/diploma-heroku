const express = require('express');
const router = express.Router();

const Monograph = require('../models').Monograph;
const Thesis = require('../models').Thesis;
const Periodicity = require('../models').Periodicity;
const User = require('../models').User;
const authenticateToken = require('../utils');

function userIds(author, subauthors) {
  let authorIds, subauthorsString = null;

  if (subauthors) {
    subauthorsString = subauthors.join();
    authorIds = [...subauthors, author];

    return { ids: authorIds, subauthorsString };
  } else {
    authorIds = [author];

    return { ids: authorIds, subauthorsString }
  }
}

// ------------ Monograph ----------
router.post('/monograph', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Monograph.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/monograph/all', function (req, res, next) {
  Monograph.findAll({
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/monograph/:id', function (req, res, next) {
  Monograph.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/monograph/:id', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Monograph.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (!post) res.status(404).send('Post not found');

      post.setUsers(ids);
      post.update({ subauthors: subauthorsString, author, ...rest });

      res.status(200).send(post);
    })
    .catch(err => console.log('----', err));
});

router.delete('/monograph/:id', authenticateToken, function (req, res, next) {
  Monograph.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Deleted successfully'))
    .catch(err => console.log('----', err));
});
// -------------------------------
// ------------ Thesis -----------
router.post('/thesis', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Thesis.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/thesis/all', function (req, res, next) {
  Thesis.findAll({
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/thesis/:id', function (req, res, next) {
  Thesis.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/thesis/:id', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Thesis.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (!post) res.status(404).send('Post not found');

      post.setUsers(ids);
      post.update({ subauthors: subauthorsString, author, ...rest });

      res.status(200).send(post);
    })
    .catch(err => console.log('----', err));
});

router.delete('/thesis/:id', authenticateToken, function (req, res, next) {
  Thesis.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Deleted successfully'))
    .catch(err => console.log('----', err));
});
// -----------------------------
// ---------- Periodicity ------
router.post('/periodicity', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Periodicity.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/periodicity/all', function (req, res, next) {
  Periodicity.findAll({
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/periodicity/:id', function (req, res, next) {
  Periodicity.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/periodicity/:id', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Periodicity.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (!post) res.status(404).send('Post not found');

      post.setUsers(ids);
      post.update({ subauthors: subauthorsString, author, ...rest });
      res.status(200).send(post);
    })
    .catch(err => console.log('----', err));
});

router.delete('/periodicity/:id', authenticateToken, function (req, res, next) {
  Periodicity.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).send('Deleted successfully'))
    .catch(err => console.log('----', err));
});
// ----------------------------

module.exports = router;
