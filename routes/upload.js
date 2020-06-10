const express = require('express');
const router = express.Router();
const multer = require('multer');

const authenticateToken = require('../utils');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).array('files');

router.post('/', authenticateToken, function (req, res, next) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).send(req.files);
  });
});

module.exports = router;
