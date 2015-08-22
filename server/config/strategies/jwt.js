var jwt = require('jsonwebtoken'),
    moment = require('moment'),
    config = require('../config.js');


module.exports = function(user,res) {
    var payload = {
        sub: user._id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.sign(payload, config.tokenSecret);
    res.status(200).send({
        user: user,
        token: token,
    });

};