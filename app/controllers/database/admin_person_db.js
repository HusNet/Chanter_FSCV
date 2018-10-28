
exports.insertNewPerson = function (usermodel) {
    return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`, `StartAbo`, `Newsletter`, `LocationId`) " +
        "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.Phone + "', " +
        "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "', '" + usermodel.StartAbo + "', '" + usermodel.Newsletter + "', '" + usermodel.LocationId +"')";
}

exports.getIdOfUserFromEmail = function (lastname, firstname, email) {
    return "SELECT * FROM `User` " +
        "WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "' AND `Email` = '" + email + "'";
}


exports.deletePersonAndLocation = function (LocationId) {
    return "DELETE User, Location " +
        "FROM User JOIN Location ON User.LocationId = Location.LocationId " +
        "WHERE Location.LocationId = '" + LocationId + "'";

}