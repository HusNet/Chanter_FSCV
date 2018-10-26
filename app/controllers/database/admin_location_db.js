exports.insertNewLocation = function (locationModel) {
    return "INSERT INTO `Location` (`Address`, `NPA`, `City`) " +
        "VALUES ('" + locationModel.Address + "', '" + locationModel.NPA + "', '" + locationModel.City + "')";
}