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
    res.render('login');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }));

/* Logout current user */
router.route('/logout')
  .get((req, res) => {
    req.session.destroy(req.sessionID);
    res.redirect('/');
    res.end();
  });

/* View a list of all user's photos */
router.route('/photos')
  .get((req, res) => {
    Gallery.findAll({
      where: {
        author: req.user.username
      }
    })
    .then((photos) => {
      console.log(photos);
      res.render('user-photos', {
        username: req.user.username,
        photos: photos
      });
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
  });

/* See "Sign-Up" page */
router.route('/signup')
  .get((req, res) => {
    res.render('signup');
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
              res.redirect('/');
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