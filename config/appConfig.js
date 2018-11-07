const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production',
    db = require('mysql');

const config = {
    /*development: {
        root: rootPath,
        app: {
            name: 'chanter-dev'
        },
        port: 3000,
        db: db.createConnection({
            host: "mariadb",
            database: "chanter-dev",
            user: "dev",
            password: "unlucky",
            multipleStatements: "true"
        }),
    },

*/
    production: {
       

    },




};

module.exports = config[env];
