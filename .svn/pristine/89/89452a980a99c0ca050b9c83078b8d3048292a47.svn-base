'use strict';

var express = require('express'),
    controller = require('./user-controller');
/*
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
*/

var router = express.Router();
router.all('/verification', controller.verify);
router.all('/bseregistration', controller.bse);
router.all('/check', controller.check);
module.exports = router;
