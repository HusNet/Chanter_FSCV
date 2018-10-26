exports.getRoleByName = function(roleName) {
    return "SELECT * FROM User INNER JOIN User_Role ON User.UserId = User_Role.UserId INNER JOIN Role ON User_Role.RoleId = Role.RoleId WHERE Role.Name = '" + roleName + "'";
};
