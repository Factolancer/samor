// Set default node environment to production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var config = require('./config/environment');
var mongoose = require('mongoose');
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'fc0' }
}

// connecting mongo
mongoose.connect(config.mongo.uri, options);

// Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);
var cluster = require('cluster');
var fs = require('fs');

if (cluster.isMaster && process.env.NODE_ENV == 'production') {
    var numWorkers = require('os').cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');
    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    // Setup server
    var app = require('express')();
    var server = require('http').createServer(app);
    var http_server = require('http').createServer(app);

    require('./config/express')(app);
    require('./routes')(app);
    http_server.listen(config.http_port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.http_port, app.get('env'));
    });

    if (process.env.NODE_ENV == 'production') {
        var privateKey = fs.readFileSync('/opt/node/ssl/www_fincash_com.key', 'utf8');
        var certificate = fs.readFileSync('/opt/node/ssl/www_fincash_com.crt', 'utf8');
        var cabundle = fs.readFileSync('/opt/node/ssl/www_fincash_com.ca-bundle', 'utf8');
        var credentials = {ca: cabundle, key: privateKey, cert: certificate};
        var https_server = require('https').createServer(credentials, app);
        https_server.listen(config.https_port, config.ip, function () {
            console.log('Express server listening on %d, in %s mode', config.https_port, app.get('env'));
        });
    }

    /*var socketio = require('socket.io')(server, {
     serveClient: (config.env === 'production') ? false : true,
     path: '/socket.io-client'
     });
     require('./config/socketio')(socketio);
     */

    process.on('message', function (message) {
        if (message.type === 'shutdown') {
            console.log("message from cluster to shutdown worker");
            process.exit(0);
        }
    });

    process.on('uncaughtException', function (err) {
        console.error("uncaughtException");
        console.error(err);
        //process.exit(1);
    });

    // Expose app
    exports = module.exports = app;
}
