
exports.getAll = function() {
    return "SELECT * FROM `Menu`";
};

exports.getById = function(id) {
    return "SELECT * FROM Menu WHERE `idMenu` = " + id + ";";
};

exports.insert = function(name_fr, name_de) {
    return "INSERT INTO `Menu` (`Name_fr`, `Name_de`) VALUES ('" + name_fr + "', '" + name_de + "')";
};

exports.update = function(id, name_fr, name_de) {
    return "UPDATE `Menu` SET `Name_fr` = '" + name_fr + "', `Name_de` = '" + name_de + "'  WHERE `idMenu` = " + id +";";
};

exports.delete = function(id) {
    return "DELETE FROM `Menu` WHERE `idMenu` = " + id + ";";
};
