'use strict';

var express = require('express'),
    controller = require('./kyc-controller');
/*
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
*/

var router = express.Router();
router.all('*', controller.index);
module.exports = router;