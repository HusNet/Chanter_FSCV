
exports.getAll = function() {
    return "SELECT * FROM `Menu`";
};

exports.getById = function(id) {
    return "SELECT * FROM Menu WHERE `idMenu` = " + id + ";";
};

exports.insert = function(name) {
    return "INSERT INTO `Menu` (`Name`) VALUES ('" + name + "')";
};

exports.update = function(id, name) {
    return "UPDATE `Menu` SET `Name` = '" + name + "' WHERE `idMenu` = " + id +";";
};

exports.delete = function(id) {
    return "DELETE FROM `Menu` WHERE `idMenu` = " + id + ";";
};
