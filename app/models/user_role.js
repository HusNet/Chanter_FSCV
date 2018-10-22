const C = require('../../config/appConfig');

function user_role(rows) {
    this.UserId = rows.UserId;
    this.RoleId = rows.RoleId;
}

module.exports = user_role;