var User = require('mongoose').model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, function(email, password, done) {
        User.findOne({
            email: email
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log('No such user');
                return done(null, false, {
                    message: {
                        email: 'This email is not registered.'
                    }
                });
            }
            user.comparePasswords(password, function(err, isMatch) {
                if (err) return done(err);
                if (!isMatch) {
                    console.log('Wrong email/password');
                    return done(null, false, {
                        message: {
                            password: 'Wrong password'
                        }
                    });
                }
                return done(null, user);
            });

        });

    }));
};
