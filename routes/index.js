const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

/* View a list of gallery photos */
router.route('/')
  .get((req, res) => {
    Gallery.findAll()
      .then((photos) => {
        console.log(photos);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

module.exports = router;