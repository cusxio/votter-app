// exports.ensureAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     } else {
//         res.status(401).send({message:'Please login or create an Account to create and view your own Poll'});
//     }
// };
var jwt = require('jsonwebtoken'),
    config = require('../../config/config.js'),
    request = require('request'),
    User = require('mongoose').model('User'),
    createToken = require('../../config/strategies/jwt.js');


exports.ensureAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({
            message: 'You are not authorized !'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.verify(token, config.tokenSecret);
    if (!payload.sub) {
        res.status(401).send({
            message: 'Authentication failed'
        });
    }
    return next();
};

exports.google = function(req, res) {
    var accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.googleClientSecret,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };
    //Step 1: Exchange Authorization Code for access token
    request.post(accessTokenUrl,{json: true, form: params}, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };

        request.get({url: peopleApiUrl, headers: headers, json: true}, function(err, response, profile) {
            if(profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
        User.findOne({email: profile.email}, function(err, found){
            if(found) {
                createToken(found, res);
            } else {
                var newUser = new User();
                newUser.email = profile.email;
                newUser.save(function(err) {
                    createToken(newUser, res);
                });
            }
        });
        });
    });

};