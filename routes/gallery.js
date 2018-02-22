const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

/* See a form to edit a gallery photo identified by the :id param */
router.route('/:id/edit')
  .get((req, res) => {
    Gallery.findById(req.params.id)
      .then((photo) => {
        console.log('edit photo form');
        console.log(photo);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

/* See a single gallery photo */
router.route('/:id')
  // To see a single gallery photo
  .get((req, res) => {
    Gallery.findById(req.params.id)
      .then((photo) => {
        console.log('get photo');
        console.log(photo);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  })
  // Update a single gallery photo
  .put((req, res) => {
    Gallery.update({
      title: req.body.title,
      link: req.body.link,
      description: req.body.description
    }, {
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then((photo) => {
        console.log('edit photo');
        console.log(photo);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  })
  // Delete a single gallery photo
  .delete((req, res) => {
    Gallery.destroy({
      where : {
        id: req.params.id
      }
    })
      .then((photo) => {
        console.log('delete photo');
        console.log(photo);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

/* See a "new photo" form */
router.route('/new')
  .get((req, res) => {
    console.log('new photo form');
  });

/* Create a new gallery photo */
router.route('/')
  .post((req, res) => {
    Gallery.create({
      title: req.body.title,
      author: req.body.username,
      link: req.body.link,
      description: req.body.description
    })
      .then((photo) => {
        console.log('new photo');
        console.log(photo);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

module.exports = router;