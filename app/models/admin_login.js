
function AdminLogin(rows) {
    this.AdminId = rows.AdminId;
    this.Username = rows.Username;
    this.Password = rows.Password;
    this.UserId = rows.UserId;
}

module.exports = AdminLogin;