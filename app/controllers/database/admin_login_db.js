exports.getByUsername = function(username) {
    return "SELECT * FROM `Admin_Login` WHERE `Username` = '" + username + "'";
};


