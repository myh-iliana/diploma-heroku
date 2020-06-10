const express = require('express');
const router = express.Router();
const Cathedra = require('../models').Cathedra;

router.get('/', function (req, res, next) {
  Cathedra.findAll({
    include: 'workers'
  })
    .then((cathedras) => res.send(cathedras))
    .catch((err) => console.log(err));
});

router.get('/:id', function (req, res, next) {
  Cathedra.findOne({
    include: 'workers',
    where: { id: req.params.id }
  })
    .then((cathedra) => {
      if(!cathedra) return res.status(404).send('Cathedra not found');

      return res.send(cathedra.get())
    })
    .catch((err) => console.log(err));
});

module.exports = router;
