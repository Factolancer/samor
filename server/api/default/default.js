/**
 * Created by Fincash on 23-01-2017.
 */

var config = require('../../config/environment'),
    path = require('path');

exports.index = function (req, res) {
    console.log("request @ default controller");
    var ppath = path.join(config.root, config.dist);
    console.log(ppath);
    res.sendFile('index.html', {root : ppath});
}
