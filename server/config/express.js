var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    passport = require('passport');


module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors({
        credentials: true,
        origin: true
    }));
    app.use(morgan('dev'));
    app.use(passport.initialize());
    // app.use(passport.session());

    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/polls.server.routes.js')(app);



    return app;
}
