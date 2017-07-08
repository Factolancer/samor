'use strict';

var express = require('express');
var passport = require('passport');

// Passport Configuration
require('./facebook/passport').setup();
require('./google/passport').setup();
var router = express.Router();
// initializing passport
router.use(passport.initialize());
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

module.exports = router;
