const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

/* See a "new photo" form */
router.route('/new')
  .get((req, res) => {
    if(req.user) {
      res.render('photo-new', {
        username: req.user.username
      });
    } else {
      res.render('error');
    }
  });

/* See a single gallery photo */
router.route('/:id')
  // To see a single gallery photo
  .get((req, res) => {
    console.log('get');
    Gallery.findById(req.params.id)
      .then((photo) => {
        if(req.user) {
          res.render('photo-detail', {
            title: photo.title,
            author: photo.author,
            link: photo.link,
            description: photo.description,
            username: req.user.username
          });
        } else {
          res.render('photo-detail', {
            title: photo.title,
            author: photo.author,
            link: photo.link,
            description: photo.description
          });
        }
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

/* Create a new gallery photo */
router.route('/')
  .post((req, res) => {
    Gallery.create({
      title: req.body.title,
      author: req.user.username,
      link: req.body.link,
      description: req.body.description
    })
      .then((photo) => {
        res.redirect(`/gallery/${photo.id}`);
        res.end();
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

module.exports = router;