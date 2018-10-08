const
    express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    fs = require('fs');

module.exports = function(app, config) {

    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'pug');
    app.use('/public', express.static(config.root + '/public'));
    app.use(logger('dev'));
    app.use(logger('common', {stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})}));
    app.use(session({
        key: 'sid',
        secret: 'shhhhh, this is secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: -1 // infinite
        }
    }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
};