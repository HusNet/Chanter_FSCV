const C = require('../../config/appConfig');

function role(rows) {
    this.Name = rows.Name;
    this.Picture = rows.Picture;
}

module.exports = role;