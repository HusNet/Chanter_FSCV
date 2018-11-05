exports.getRoleByName = function(roleName) {
    return "SELECT * FROM User INNER JOIN User_Role ON User.UserId = User_Role.UserId INNER JOIN Role ON User_Role.RoleId = Role.RoleId WHERE Role.Name = '" + roleName + "'";
};

exports.getExportChoir = function (name, fundationYear, church, gospel, language, effectif, npa) {
    let query = "SELECT * " +
                    "FROM `Choir` " +
                    "INNER JOIN `Effectif` ON `Choir`.EffectifId = `Effectif`.EffectifId " +
                    "INNER JOIN `Location` ON `Choir`.LocationId = `Location`.LocationId " +
                    "WHERE 1 = 1 ";

    if(name !== null || fundationYear !== null || church !== null || gospel !== null || language !== null || effectif !== null || npa !== null) {

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
            query += " AND `Effectif`.`NbMembers` = " + effectif;

        if(npa !== null)
            query += " AND `Location`.`NPA` = '" + npa + "'";
    }

    return query;
};
