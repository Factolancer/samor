'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var loginAttemptsArchive = require('../../api/loginAttemptsArchive/loginAttemptsArchive.controller');
var router = express.Router();
var Errors = require('../../config/errors.json');

function handleError(res, status, err) {
  return res.status(status).json({msg: err || Errors.common});
}

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return handleError(res, 401, Errors.auth.UNAUTH);
    if (!user) return handleError(res, 404, Errors.common);

    var token = auth.signToken(user._id, user.role.group.pop());
    req.user = user;
    req.message = 'logged in via local';
    loginAttemptsArchive.create(req, res, function() {
      res.json({token: token});
    });
  })(req, res, next)
});

module.exports = router;
