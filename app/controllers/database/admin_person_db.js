
exports.insertNewPerson = function (usermodel) {
    if (usermodel.StartAbo === ''){
        return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`, `Newsletter`, `LocationId`) " +
            "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.Phone + "', " +
            "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "', '" + usermodel.Newsletter + "', '" + usermodel.LocationId +"')";

    }
    else {
        return "INSERT INTO `User` (`Lastname`, `Firstname`, `Phone`, `PhoneProf`, `Email`, `StartAbo`, `Newsletter`, `LocationId`) " +
            "VALUES ('" + usermodel.Lastname + "', '" + usermodel.Firstname + "', '" + usermodel.Phone + "', " +
            "'" + usermodel.PhoneProf + "', '" + usermodel.Email + "', '" + usermodel.StartAbo + "', '" + usermodel.Newsletter + "', '" + usermodel.LocationId +"')";

    }
};


exports.editPerson = function(userIdEdit, editUserModel) {
    if (editUserModel.StartAbo === ''){
        return  "UPDATE `User` " +
            "SET `Lastname` = '" + editUserModel.Lastname + "', `Firstname` = '" + editUserModel.Firstname + "', " +
            "`Phone` = '" + editUserModel.Phone + "', `PhoneProf` = '" + editUserModel.PhoneProf + "', " +
            "`Email` = '" + editUserModel.Email + "', `Newsletter` = '" + editUserModel.Newsletter + "'" +
            "WHERE `UserId` = " + userIdEdit;
    }
    else{
        return  "UPDATE `User` " +
            "SET `Lastname` = '" + editUserModel.Lastname + "', `Firstname` = '" + editUserModel.Firstname + "', " +
            "`Phone` = '" + editUserModel.Phone + "', `PhoneProf` = '" + editUserModel.PhoneProf + "', " +
            "`Email` = '" + editUserModel.Email + "', `StartAbo` = '" + editUserModel.StartAbo + "', " +
            "`Newsletter` = '" + editUserModel.Newsletter + "'" +
            "WHERE `UserId` = " + userIdEdit;

    }

};
exports.getUserWithoutMail = function (lastname, firstname) {
    return "SELECT * FROM `User` " +
        "WHERE `Lastname` = '" + lastname + "' AND `Firstname` = '" + firstname + "'";
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

exports.getExportPerson = function (lastname, firstname, phone, phoneProf, email, startAbo, newsletter, location) {
    let query = "SELECT * " +
                    "FROM `User` " +
                    "JOIN `Location` ON `User`.LocationId = `Location`.LocationId " +
                    "WHERE 1 = 1";

    console.log(lastname + '-' + firstname + '-' + phone + '-' + phoneProf + '-' + email + '-' + startAbo + '-' + newsletter + '-' + location);

    if(lastname !== null)
        query += " AND `User`.`Lastname` = '" + lastname + "'";

    if(firstname !== null)
        query += " AND `User`.`Firstname` = '" + firstname + "'";

    if(phone !== null)
        query += " AND `User`.`Phone` = '" + phone + "'";

    if(phoneProf !== null)
        query += " AND `User`.`PhoneProf` = '" + phoneProf + "'";

    if(email !== null)
        query += " AND `User`.`Email` = " + email;

    if(startAbo !== null)
        query += " AND `User`.`StartAbo` = '" + startAbo + "'";

    if(newsletter !== null)
        query += " AND `User`.`Newsletter` = '" + newsletter + "'";

    if(location !== null)
        query += " AND `Location`.`NPA` = '" + location + "'";

    return query;
};