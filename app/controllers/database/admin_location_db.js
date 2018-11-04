exports.insertNewLocation = function (locationModel) {
    return "INSERT INTO `Location` (`Address`, `NPA`, `City`) " +
        "VALUES ('" + locationModel.Address + "', '" + locationModel.NPA + "', '" + locationModel.City + "')";
}



exports.editLocation = function(idLocationToEdit, editLocationModel) {
    return  "UPDATE `Location` " +
        "SET `Address` = '" + editLocationModel.Address + "', `NPA` = '" + editLocationModel.NPA + "', " +
        "`City` = '" + editLocationModel.City + "'" +
        "WHERE `LocationId` = " + idLocationToEdit;
};

exports.deleteLocation = function (locationId) {
    return "DELETE FROM `Location` WHERE `LocationId` =  '" + locationId + "'";

}


exports.getLocationFromId = function (locationId) {
    return "SELECT * FROM `Location` WHERE `LocationId` =  '" + locationId + "'";

}
