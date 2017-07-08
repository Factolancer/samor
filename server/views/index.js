'use strict';

var express = require('express'),
    controller = require('./view-controller');
/*
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
*/

var router = express.Router();
router.all('*', controller.browserError);
module.exports = router;