const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models').User;

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  User.findOne({
    where: { username, password }
  }).then(foundUser => {
    if (!foundUser) {
      return res.status(404).send({ error: 'Wrong username and/or password' });
    }

    const { password, ...user } = foundUser.get();
    const payload = { id: user.id, admin: user.isAdmin };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    res.send({ accessToken, refreshToken, user });
  }).catch(err => console.log('=========',err));
});

router.post('/refreshToken', function (req, res, next) {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.send({ accessToken, refreshToken });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = router;
