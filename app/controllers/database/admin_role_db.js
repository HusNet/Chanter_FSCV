
exports.getIdRole = function (name) {
    return "SELECT RoleId FROM `Role` WHERE `Name` = '" + name + "'";
}