'use strict';

var express = require('express');
var passport = require('passport');
var passportController = require('./passport');
var router = express.Router();
var config = require('../../config/environment');

router
  .get('/', passport.authenticate('google', {
    failureRedirect: config.passport.redirectFailure,
    scope: ['email'],
    session: false
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: config.passport.redirectFailure,
    session: false
  }),passportController.processCallback);

module.exports = router;