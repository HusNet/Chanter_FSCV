const express = require('express'),
        config = require('./config/appConfig'),
        fs = require('fs'),
        app = express(),
        router = express.Router();

let modelsPath = __dirname + '/app/models';
    fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

require('./config/express')(app, config);
require('./config/routes')(app, router);

app.listen(config.port);

console.log("Node app " + config.app.name + " is running on port " + config.port + ".");

