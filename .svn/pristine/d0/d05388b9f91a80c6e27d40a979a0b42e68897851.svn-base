var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }).populate('role._permissions').exec(function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'Email / Password incorrect.' });
        }
        if (user.active === 0) {
          return done(null, false, {message: 'This account is inactive.'});
        }
        if (user.active === 2) {
          return done(null, false, {message: 'This account is banned.'});
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Email / Password incorrect.' });
        }
        return done(null, user);
      });
    }
  ));
};
