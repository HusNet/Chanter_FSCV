
exports.insertUserRole = function (idUser, idRole) {
    return "INSERT INTO `User_Role` (`UserId`, `RoleId`) " +
        "VALUES ('" + idUser + "', '" + idRole + "')";
}

