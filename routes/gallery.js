const express = require('express');
const router = express.Router();

/* See a form to edit a gallery photo identified by the :id param */
router.route('/:id/edit')
  .get((req, res) => {
    console.log('edit photo form');
  });

/* See a single gallery photo */
router.route('/:id')
  // To see a single gallery photo
  .get((req, res) => {
    console.log('get photo');
  })
  // Update a single gallery photo
  .put((req, res) => {
    console.log('edit photo');
  })
  // Delete a single gallery photo
  .delete((req, res) => {
    console.log('delete photo');
  });

/* See a "new photo" form */
router.route('/new')
  .get((req, res) => {
    console.log('new photo form');
  });

/* Create a new gallery photo */
router.route('/')
  .post((req, res) => {
    console.log('new photo');
  });

module.exports = router;