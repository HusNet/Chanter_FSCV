
exports.insertUserRole = function (idUser, idRole) {
    return "INSERT INTO `User_Role` (`UserId`, `RoleId`) " +
        "VALUES ('" + idUser + "', '" + idRole + "')";
}

exports.deleteUserRoleFromUserId = function(userId){
    return "DELETE FROM `User_Role` WHERE `UserId` = '" + userId + "'";
}