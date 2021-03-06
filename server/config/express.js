/**
 * Express configuration
 */

'use strict';
var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    config = require('./environment'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    util = require('../util/util');

module.exports = function (app) {
    var env = app.get('env');
    //app.set('views', config.root + '/server/views');
    //app.engine('html', require('ejs').renderFile);
    //app.set('view engine', 'html');
    app.enable('trust proxy');
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: 1024 * 1024 * 10, type: 'application/json'}));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(function(req, res, next) {
        if(process.env.NODE_ENV == 'production'){
            var isWWW = true;
            var host = req.headers.host;
            if(host && (typeof host === 'string') && host.indexOf('www')==-1 && host.indexOf('fincash.com')!=-1){
                host = "www."+host;
                isWWW = false;
            }
            // console.log("Request ip is [" + req.ip +"] protocol  https ["+req.secure+"]");
            if (req.secure){
                if(isWWW){
                    return next();
                }else{
                    console.log("Redirecting to >>> " + "https://" + host + req.url);
                    res.redirect(301,"https://" + host + req.url);
                }
            }else{
                console.log("Redirecting to >>> " + "https://" + host + req.url);
                res.redirect(301,"https://" + host + req.url);
            }
        }else{
            return next();
        }
    });

    // Persist sessions with mongoStore
    // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
    /*app.use(session({
     secret: config.secrets.session,
     resave: true,
     saveUninitialized: true,
     store: new mongoStore({mongoose_connection: mongoose.connection})
     }));*/
    //app.use(favicon(path.join(config.root, 'server/dist', 'assets/favicon.ico')));
    // mapping angular2 static files

    app.use(express.static(path.join(config.root, config.dist)));
    //app.use(express.static(path.join(config.root, config.document.rootPath)));

    if (!fs.existsSync(path.join(config.root, config.document.rootPath))) {
        fs.mkdir(path.join(config.root, config.document.rootPath));
    }
    if (!fs.existsSync(path.join(config.root, config.document.rootPath, config.document.pdfPath))) {
        fs.mkdir(path.join(config.root, config.document.rootPath, config.document.pdfPath));
    }
    if (!fs.existsSync(path.join(config.root, config.document.rootPath, config.document.imagePath))) {
        fs.mkdir(path.join(config.root, config.document.rootPath, config.document.imagePath));
    }
    if (!fs.existsSync(path.join(config.root, config.document.rootPath, config.document.upload))) {
        fs.mkdir(path.join(config.root, config.document.rootPath, config.document.upload));
    }
    if (!fs.existsSync(path.join(config.root, config.document.rootPath, config.document.snapshot))) {
        fs.mkdir(path.join(config.root, config.document.rootPath, config.document.snapshot));
    }
    var uploadPath = path.join(config.root, config.document.rootPath);
    //console.log("upload path >>> " + uploadPath);
    app.use(express.static(uploadPath));
    app.use(morgan('combined'));

}
