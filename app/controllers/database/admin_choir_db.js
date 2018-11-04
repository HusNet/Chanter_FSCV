exports.getRoleByName = function(roleName) {
    return "SELECT * FROM User INNER JOIN User_Role ON User.UserId = User_Role.UserId INNER JOIN Role ON User_Role.RoleId = Role.RoleId WHERE Role.Name = '" + roleName + "'";
};

exports.getAllChoir = function () {
    return  "SELECT * " +
            "FROM Choir " +
                "INNER JOIN Effectif ON Choir.EffectifId = Effectif.EffectifId " +
                "INNER JOIN Location ON Choir.LocationId = Location.LocationId";
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
