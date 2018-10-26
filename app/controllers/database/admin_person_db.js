
exports.insertNewPerson = function (usermodel) {
    return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`, `StartAbo`) " +
        "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.phone + "', " +
        "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "', '" + usermodel.StartAbo + "')";
}

exports.getIdOfUserFromEmail = function (lastname, firstname, email) {
    return "SELECT * FROM `User` WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "' AND `Email` = '" + email + "'";
}

exports.getIdOfUser = function (lastname, firstname) {
    return "SELECT UserId FROM `User` WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "'";
}

exports.deletePerson = function (lastname,firstname) {
    return "DELETE FROM `User` WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "' ";
}