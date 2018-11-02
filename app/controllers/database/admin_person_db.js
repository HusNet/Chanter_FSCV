exports.insertNewPerson = function (usermodel) {
    return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`, `StartAbo`, `Newsletter`, `LocationId`) " +
        "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.Phone + "', " +
        "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "', '" + usermodel.StartAbo + "', '" + usermodel.Newsletter + "', '" + usermodel.LocationId +"')";
};


exports.editPerson = function(userIdEdit, editUserModel) {
    return  "UPDATE `User` " +
        "SET `Lastname` = '" + editUserModel.Lastname + "', `Firstname` = '" + editUserModel.Firstname + "', " +
        "`Phone` = '" + editUserModel.Phone + "', `PhoneProf` = '" + editUserModel.PhoneProf + "', " +
        "`Email` = '" + editUserModel.Email + "', `StartAbo` = '" + editUserModel.StartAbo + "', " +
        "`Newsletter` = '" + editUserModel.Newsletter + "'" +
        "WHERE `UserId` = " + userIdEdit;
};

exports.getUser = function (lastname, firstname, email) {
    return "SELECT * FROM `User` " +
        "WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "' AND `Email` = '" + email + "'";
};


exports.deletePersonAndLocation = function (LocationId) {
    return "DELETE User, Location " +
        "FROM User JOIN Location ON User.LocationId = Location.LocationId " +
        "WHERE Location.LocationId = '" + LocationId + "'";

};

exports.getAllUsers = function () {
    return "SELECT * FROM `User`";
};