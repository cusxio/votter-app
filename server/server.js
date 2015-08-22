var express = require('./config/express.js'),
    config = require('./config/config.js'),
    mongoose = require('./config/mongoose.js'),
    passport = require('./config/passport.js')

var db = mongoose();
var app = express();
var passport = passport();

app.listen(config.port, function() {
    console.log('Its happening at PORT: ' + config.port);
});

