const express = require('express');
const fs = require('fs');
const config = require('./config/appConfig');

let modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

let app = express();
let router = express.Router();

require('./config/express')(app, config);
require('./config/routes')(app, router);

app.listen(config.port);
