/**
 * Created by Fincash on 23-01-2017.
 */

var config = require('../config/environment'),
    path = require('path');


exports.browserError = function (req, res) {
    console.log("request @ view controller browser not supported");
    var ppath = path.join(config.root, config.views);
    console.log(ppath);
    res.sendFile('browser-not-supported.html', {root : ppath});
}