
exports.insertNewPerson = function (usermodel) {

    return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`) " +
        "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.phone + "', " +
        "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "')";
}