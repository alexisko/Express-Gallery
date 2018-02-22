const express = require('express');
const router = express.Router();

/* See a form to edit a gallery photo identified by the :id param */
router.route('/:id/edit')
  .get((req, res) => {

  });

/* See a single gallery photo */
router.route('/:id')
  // To see a single gallery photo
  .get((req, res) => {

  })
  // Update a single gallery photo
  .put((req, res) => {

  })
  // Delete a single gallery photo
  .delete((req, res) => {

  });

/* See a "new photo" form */
router.route('/new')
  .get((req, res) => {

  });

/* Create a new gallery photo */
router.route('/')
  .post((req, res) => {

  });

module.exports = router;