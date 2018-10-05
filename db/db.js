const Sequilize = require('sequelize');
const sequilize = new Sequilize('chanter', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

static function dbConnect() {
    sequilize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        })
        .catch(err => {
            console.error('Unable to connect to the database: ', err);
        });
}




