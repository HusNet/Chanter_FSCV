exports.getRoleByName = function(roleName) {
    return "SELECT * FROM User INNER JOIN User_Role ON User.UserId = User_Role.UserId INNER JOIN Role ON User_Role.RoleId = Role.RoleId WHERE Role.Name = '" + roleName + "'";
};

exports.getAllChoir = function () {
    return "SELECT * FROM Choir";
};

exports.delete = function(id){
    return "DELETE FROM Choir WHERE ChoirId = " + id;
};
exports.insert = function (modelChoir) {
    return "INSERT INTO Choir (`Name`, `FundationYear`, `Church`, `Gospel`, `Language`, `Remarks`, `WebPage`, `EffectifId`, `Mailing`, `LocationId`, `NamePresident`, `NameDirector`, `NameCashier`, `NameSecretary`) " +
    "VALUES ('" + modelChoir.Name + "', '" + modelChoir.FundationYear + "', '" + modelChoir.Church + "', " +
    "'" + modelChoir.Gospel + "', '" + modelChoir.Language + "', '" + modelChoir.Comments + "', '" + modelChoir.Homepage + "', '" + modelChoir.EffectifId +"', '" + modelChoir.Mailing + "', '" + modelChoir.LocationId + "', '" + modelChoir.NamePresident + "', '" + modelChoir.NameDirector + "', '" + modelChoir.NameCashier + "', '" + modelChoir.NameSecretary + "')";


};

exports.getExportChoir = function (name, fundationYear, church, gospel, language, effectif, location) {
    let query = "SELECT * FROM Choir";

    if(name !== null || fundationYear !== null || church !== null || gospel !== null || language !== null || effectif !== null || location !== null) {
        query += " WHERE ";

        if(name !== null)
            query += " AND `Name` = '" + name + "'";

        if(fundationYear !== null)
            query += " AND `FundationYear` = '" + fundationYear + "'";

        if(church !== null)
            query += " AND `Church` = '" + church + "'";

        if(gospel !== null)
            query += " AND `Gospel` = '" + gospel + "'";

        if(language !== null)
            query += " AND `Language` = '" + language + "'";

        if(effectif !== null)
            query += " AND `EffectifId` = " + effectif;

        if(location !== null)
            query += " AND `LocationId` = '" + location + "'";
    }

    return query;
};
