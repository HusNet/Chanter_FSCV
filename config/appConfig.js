const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    db = require('mysql');


const config = {
    development: {
        root: rootPath,
        app: {
            name: 'chanter-dev'
        },
        port: 3000,
        db: db.createConnection({
            host: "localhost",
            database: "chanter-dev",
            user: "dev",
            password: "unlucky",
            multipleStatements: "true"
        }),
    },

    production: {
        root: rootPath,
        app: {
            name: 'chanter-webapp'
        },
        port: 80,
    },

    i18n: {
        translationsPath: path.join(__dirname, '../public/locales'),
        siteLangs: ['fr', 'de'],
        defaultLocale: 'fr',
        textsVarName: 'translation'
    }


};

module.exports = config[env];
