
function user(rows) {
    this.UserId = rows.UserId;
    this.Lastname = rows.Lastname;
    this.Firstname = rows.Firstname;
    this.Phone = rows.Phone;
    this.PhoneProf = rows.PhoneProf;
    this.Email = rows.Email;
    this.StartAbo = rows.StartAbo;
    this.Newsletter = rows.Newsletter;
    this.LocationId = rows.LocationId;
}

module.exports = user;