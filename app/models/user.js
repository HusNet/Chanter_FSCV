const C = require('../../config/appConfig');

function user(rows) {
    this.Lastname = rows.Lastname;
    this.Firstname = rows.Firstname;
    this.Phone = rows.Phone;
    this.PhoneProf = rows.PhoneProf;
    this.Email = rows.Email;
    this.StartAbo = rows.StartAbo;

}

module.exports = user;