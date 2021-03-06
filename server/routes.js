/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors'),
    config = require('./config/environment'),
    cors = require('cors'),
    helmet = require('helmet'),
    path = require('path');

module.exports = function (app) {
    app.disable('x-powered-by');
    app.use(cors());
    // below is the code set content policy on all modern browsers. to deny any load of outside scripts as well as not  allow site to be opened in iframe etc.
    /*app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", '*.fincash.com'],
            styleSrc: ["'self'", "'unsafe-inline'", '*.googleapis.com', '*.zopim.com', '*.zendesk.com'],
            imgSrc: ["'self'", 'data:', '*.cloudfront.net', '*.zopim.com', '*.zendesk.com'],
            scriptSrc: ["'self'", "'unsafe-inline'", '*.google-analytics.com', '*.zopim.com', '*.zendesk.com'],
            fontSrc: ["'self'", 'data:', '*.gstatic.com', '*.zopim.com', '*.zendesk.com'],
            connectSrc: ["'self'", 'wss:', '*.fincash.com', '*.fincash.com:2930', '*.zendesk.com', '*.zopim.com']
        }
    }));*/
    app.use('/api/kyc', require('./api/kyc'));
    app.use('/api/user', require('./api/user'));
    app.use('/api/bse', require('./api/bse'));
    app.use('/api/auth', require('./auth'));
    app.use('/api/file', require('./api/file'));
    app.use('/server/views', require('./views'));
    app.use('/*', require('./api/default'));
    //All undefined asset or api routes should return a 404
    //app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);
};

