const C = require('../../config/appConfig');

function role(rows) {
    this.RoleId = rows.RoleId;
    this.Name = rows.Name;
    this.Picture = rows.Picture;
}

module.exports = role;