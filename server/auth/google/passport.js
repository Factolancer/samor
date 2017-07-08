var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../../config/environment');
var httpRequest = require('request');

exports.setup = function () {

    var strategyConfig = {};
    strategyConfig['clientID'] = config.passport.google.CLIENT_ID;
    strategyConfig['clientSecret'] = config.passport.google.CLIENT_SECRET;
    strategyConfig['callbackURL'] = config.DOMAIN + config.passport.google.CALLBACK;
    //console.log(strategyConfig);
    passport.use(new GoogleStrategy(strategyConfig,
        function (accessToken, refreshToken, profile, done) {
            /*console.log("token >>> " + accessToken);
             console.log("refresh token >>> " + refreshToken);
             console.log(profile);*/
            var userObject = {};
            userObject['name'] = profile.displayName;
            userObject['email'] = profile.emails[0].value;
            userObject['provider'] = 'google';
            userObject['id'] = profile.id;
            userObject['facebook'] = profile._json;
            //console.log(userObject)

            var url = "http://"+config.playServer.ip + ':' + config.playServer.http_port + config.playServer.path + '/server/socialLogin';
            var auth = "Basic " + new Buffer(config.serverLogin.user + ":" + config.serverLogin.password).toString("base64");
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
                    if (error && error!=null) {
                        console.log('upload failed: @  /server/socialLogin ', error);
                        return done(error);
                    }
                    console.log('Upload successful! @  /server/socialLogin Server responded with:', body);
                    return done(null, body);
                }
            );
        }
    ));
};


exports.processCallback = function (req, res) {
    console.log(req.user);
    try {
        var userObject = JSON.parse(req.user);
        console.log(userObject);
        if(userObject && userObject.success){
            res.redirect(config.passport.redirectSuccess+"/"+userObject.id_token);
        }else{
            res.redirect(config.passport.redirectFailure);
        }
    }catch(err) {
        res.redirect(config.passport.redirectFailure);
    }
}