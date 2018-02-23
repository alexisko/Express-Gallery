const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

/* View a list of gallery photos */
router.route('/')
  .get((req, res) => {
    Gallery.findAll()
      .then((photos) => {
        if(req.user) {
          res.render('home', {
            username: req.user.username,
            photos: photos
          });
        } else {
          res.render('home', {
            photos: photos
          });
        }
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

module.exports = router;