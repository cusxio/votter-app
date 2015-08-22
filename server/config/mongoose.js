var mongoose = require('mongoose'),
    config = require('./config.js');


module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model.js');
    require('../app/models/poll.server.model.js');

    return db;
};