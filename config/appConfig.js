let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

let db_dev = 'mysql://app:unlucky@localhost/dbchanter-dev';
let db_prod = 'myysql://app:unlucky@localhost/dbchanter-prod';

let config = {
    development: {
        root: rootPath,
        app: {
            name: 'chanter-dev'
        },
        port: 3000,
        db: db_dev
    },

    production: {
        root: rootPath,
        app: {
            name: 'chanter-webapp'
        },
        port: 3000,
        db: db_prod
    }
};

module.exports = config[env];