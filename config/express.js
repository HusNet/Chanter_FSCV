const
    express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    i18n = require ("i18n-express"),
    path = require('path'),
    fs = require('fs');

module.exports = function(app, config) {

    let dir = './logs';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'pug');
    app.use('/public', express.static(config.root + '/public'));
    app.use(logger('dev'));
    app.use(logger('common', {stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})}));
    app.set('trust proxy', 1) // trust first proxy
    app.use(cookieParser());
    app.use(session({
        key: 'sid',
        secret: 'shhhhh, this is secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: null // infinite
        }
    }));
   app.use(i18n({
        translationsPath: path.join(__dirname, '../public/locales'),
        siteLangs: ['fr', 'de'],
        defaultLocale: 'fr',
        textsVarName: 'translation',


    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('sid');
        }
        next();
    });
};