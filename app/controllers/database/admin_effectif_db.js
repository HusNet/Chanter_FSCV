exports.insertNewEffectif = function (modelEffectif) {
    return "INSERT INTO Effectif (Year, NbMembers) " +
        "VALUES ('" + modelEffectif.year + "', '" + modelEffectif.membre + "')";
};


exports.getEffectifFromId = function (EffectifId) {
    return "SELECT * FROM `Effectif` WHERE `EffectifId` =  '" + EffectifId + "'";

};

exports.editEffectif = function(EffectifId, modelUpdateEffectif) {
    return  "UPDATE `Effectif` " +
        "SET `Year` = '" + modelUpdateEffectif.year + "', `NbMembers` = '" + modelUpdateEffectif.membre + "'" +
        "WHERE EffectifId = " + EffectifId;
};