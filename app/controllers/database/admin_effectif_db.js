exports.insertNewEffectif = function (modelEffectif) {
    return "INSERT INTO Effectif (Year, NbMembers) " +
        "VALUES ('" + modelEffectif.year + "', '" + modelEffectif.nbMembre + "')";
}

exports.deleteEffectif = function (EffectifId) {
    return "DELETE FROM Effectif WHERE EffectifId =  '" + EffectifId + "'";

}