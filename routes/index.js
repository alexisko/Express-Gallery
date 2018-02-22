const express = require('express');
const router = express.Router();

/* View a list of gallery photos */
router.route('/')
  .get((req, res) => {
    console.log('homepage');
  });

module.exports = router;