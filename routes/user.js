const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;

/* Login existing user */
router.route('/login')
  .get((req, res) => {
    console.log('login page');
  })
  .post((req, res) => {
    console.log('user logged in');
  });

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
  });

module.exports = router;