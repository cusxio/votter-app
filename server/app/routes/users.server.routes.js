var users = require('../../app/controllers/users.server.controller.js');
var createToken = require('../../config/strategies/jwt.js'),
    check = require('../../config/strategies/check.js');

var passport = require('passport');

module.exports = function(app) {

    app.route('/signup')
        .post(passport.authenticate('signup'), function(req, res) {
            createToken(req.user, res);
        });

    app.route('/login')
        .post(function(req, res, next) {
            passport.authenticate('login', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).send(info);
                }
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    createToken(req.user, res);

                });
            })(req, res, next);
        });

    app.get('/check-email', check.checkEmail);
    app.post('/auth/google', users.google);


};
