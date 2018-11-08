

exports.insertUserChoir = function (idUser, idChoir) {
    return "INSERT INTO `User_Choir` (`UserId`, `ChoirId`) " +
        "VALUES (" + idUser + ", " + idChoir + ")";
};