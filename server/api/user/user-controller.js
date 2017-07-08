/**
 * Created by Fincash on 23-01-2017.
 */

var config = require('../../config/environment'),
    httpRequest = require('request'),
    basicAuth = require('basic-auth');


exports.verify = function (req, res) {
    var userId = req.query['userid'];
    console.log("verification user  id >>>>>> " + userId);
    var credentials = basicAuth(req);
    if (!credentials || credentials.name !== 'fincash' || credentials.pass !== 'finca$h@123') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied')
    } else {
        var url = "http://" + config.playServer.ip + ':' + config.playServer.http_port + config.playServer.path + '/server/activateUser';
        var auth = "Basic " + new Buffer(config.serverLogin.user + ":" + config.serverLogin.password).toString("base64");
        var userObject = {};
        userObject['userid'] = userId;
        httpRequest({
                url: url,
                method: "POST",
                /*json: true,*/
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(userObject)
            },
            function (error, response, body) {
                if (error && error != null) {
                    console.log('upload failed: @  /server/activateUser ', error);
                    res.json({success: false, msg: error});
                }
                console.log('Upload successful! @  /server/activateUser Server responded with:', body);
                body = JSON.parse(body);
                console.log(" success >>>>>>>>  " + body.success+" message >>> " + body.message);
                if (body.success) {
                    res.json({success: true, msg: body.message});
                } else {
                    res.json({success: false, msg: body.message});
                }

            }
        )
    }
};

exports.bse = function (req, res) {

    var userId = req.query['userid'];
    console.log("verification user  id >>>>>> " + userId);
    var credentials = basicAuth(req);
    if (!credentials || credentials.name !== 'fincash' || credentials.pass !== 'finca$h@123') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied')
    } else {
        var url = "http://" + config.playServer.ip + ':' + config.playServer.http_port + config.playServer.path + '/server/bseRegistration';
        var auth = "Basic " + new Buffer(config.serverLogin.user + ":" + config.serverLogin.password).toString("base64");
        var userObject = {};
        userObject['userid'] = userId;
        httpRequest({
                url: url,
                method: "POST",
                /*json: true,*/
                headers: {
                    "content-type": "application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(userObject)
            },
            function (error, response, body) {
                if (error && error != null) {
                    console.log('upload failed: @  /server/bseRegistration ', error);
                    res.json({success: false, msg: error});
                }
                console.log('Upload successful! @  /server/bseRegistration Server responded with:', body);
                body = JSON.parse(body);
                console.log(" bse >>>>>>>>  " + body.bse + " >>>>>> fatca >>>" + body.fatca);
                if (body.bse) {
                    res.json({bse: body.bse, fatca: body.fatca, msg: "Hola!!!!"});
                } else {
                    res.json({bse: false, fatca: false, msg: "Gola!!!!"});
                }

            }
        )
    }
};

// method for AWS LB Health Check
exports.check = function (req, res) {
    res.json({success: true, msg: "ok"});
};
//module.exports = router;
