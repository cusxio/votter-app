var User = require('mongoose').model('User'),
    LocalStrategy = require('passport-local').Strategy;
    passport = require('passport');


module.exports = function() {
    passport.use('signup', new LocalStrategy({
        usernameField: 'email'
    }, function(email, password, done) {
        User.findOne({
            email: email
        }, function(err, user) {
            if (err) {
                console.log('Error in Signup');
                return done(err);

            }
            if (user) {
                console.log('Email Taken');
                return done(null, false, {
                    message: 'Email Taken'
                });
            }
            var newUser = new User({
                email: email,
                password: password
            });
            newUser.save(function(err) {
                console.log('User Registration Successful');
                return done(null, newUser);
            });
        });
    }));

};
