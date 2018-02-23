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
    }
    // redirect to error page
  });

/* See a form to edit a gallery photo identified by the :id param */
router.route('/:id/edit')
  .get((req, res) => {
    Gallery.findById(req.params.id)
      .then((photo) => {
        if(req.user) {
          res.render('photo-edit', {
            username: req.user.username
          });
        }
        // redirect to error page
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
        if(req.user) {
          console.log(photo);
          res.render('photo-detail', {
            title: photo.title,
            author: req.user.username,
            link: photo.link,
            description: photo.description,
            username: req.user.username
          });
        } else {
          res.render('photo-detail', {
            title: photo.dataValues.title,
            author: req.user.username,
            link: photo.dataValues.link,
            description: photo.dataValues.description
          });
        }
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