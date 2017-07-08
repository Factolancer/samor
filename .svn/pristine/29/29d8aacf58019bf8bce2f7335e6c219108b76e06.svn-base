'use strict';

var express = require('express'),
    controller = require('./bse-controller'),
    pdfController = require('./pdf-controller');
/*
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
*/

var router = express.Router();
router.all('/client', controller.clientRegistration);
router.all('/bsedoc', pdfController.bsedoc);

module.exports = router;
