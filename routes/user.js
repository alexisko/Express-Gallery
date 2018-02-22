const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');
const { Gallery, User } = db;

const saltRounds = 10;

/* Login existing user */
router.route('/login')
  .get((req, res) => {
    console.log('login page');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }));

/* See "Sign-Up" page */
router.route('/signup')
  .get((req, res) => {
    console.log('sign up');
  });

/* Logout current user */
router.route('/logout')
  .get((req, res) => {
    console.log('logout');
  });

/* Create new user */
router.route('/')
  .post((req, res) => {
    console.log('create user');
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        bcrypt.hash(req.body.password, salt)
          .then((hash) => {
            // Create new user with hashed password
            User.create({
              username: req.body.username,
              password: hash
            })
            .then(() => {
              // redirect to page
              res.end();
            })
            .catch((err) => {
              console.log('ERROR: ', err);
            });
          })
          .catch((err) => {
            console.log('ERROR: ', err);
          });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  });

module.exports = router;