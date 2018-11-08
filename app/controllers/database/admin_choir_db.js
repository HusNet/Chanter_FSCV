exports.getRoleByName = function(roleName) {
    return "SELECT * FROM User INNER JOIN User_Role ON User.UserId = User_Role.UserId INNER JOIN Role ON User_Role.RoleId = Role.RoleId WHERE Role.Name = '" + roleName + "'";
};

exports.getMenuById = function(Id){
    return "SELECT * FROM Menu INNER JOIN Menu_has_Page ON Menu.idMenu = Menu_has_Page.Menu_idMenu INNER JOIN Page ON Menu_has_Page.Page_PageId = Page.PageId WHERE Menu.idMenu = '" + Id + "'";
};

exports.delete = function(id){
    return "DELETE FROM Choir WHERE ChoirId = " + id;
};

exports.getAllChoir = function () {
    return  "SELECT * " +
        "FROM Choir " +
        "INNER JOIN Effectif ON Choir.EffectifId = Effectif.EffectifId " +
        "INNER JOIN Location ON Choir.LocationId = Location.LocationId";
};


exports.insert = function (modelChoir) {
    return "INSERT INTO Choir (`Name`, `FundationYear`, `Church`, `Gospel`, `Language`, `Remarks`, `WebPage`, `EffectifId`, `Mailing`, `LocationId`, `NamePresident`, `NameDirector`, `NameCashier`, `NameSecretary`) " +
    "VALUES ('" + modelChoir.Name + "', '" + modelChoir.FundationYear + "', '" + modelChoir.Church + "', " +
    "'" + modelChoir.Gospel + "', '" + modelChoir.Language + "', '" + modelChoir.Comments + "', '" + modelChoir.Homepage + "', '" + modelChoir.EffectifId +"', '" + modelChoir.Mailing + "', '" + modelChoir.LocationId + "', '" + modelChoir.NamePresident + "', '" + modelChoir.NameDirector + "', '" + modelChoir.NameCashier + "', '" + modelChoir.NameSecretary + "')";
};

exports.editChoir = function(choirId, modelUpdateChoir) {
    return  "UPDATE `Choir` " +
        "SET `Name` = '" + modelUpdateChoir.Name + "',`FundationYear` = '" + modelUpdateChoir.FundationYear + "', " +
        "`Type` = '" + modelUpdateChoir.Type + "',`Church` = '" + modelUpdateChoir.Church + "',`Gospel` = '" + modelUpdateChoir.Gospel + "',`Language` = '" + modelUpdateChoir.Language + "',`Remarks` = '" + modelUpdateChoir.Remarks + "', " +
        "`WebPage` = '" + modelUpdateChoir.WebPage  + "',`Mailing` = '" + modelUpdateChoir.Mailing + "'," +
        "`NamePresident` = '" + modelUpdateChoir.NamePresident + "',`NameDirector` = '" + modelUpdateChoir.NameDirector + "',`NameCashier` = '" + modelUpdateChoir.NameCashier + "',`NameSecretary` = '" + modelUpdateChoir.NameSecretary + "'" +
        "WHERE `ChoirId` = " + choirId;
};
exports.getChoirByName = function(name){
    return "SELECT * FROM `Choir` WHERE `Name` ='" + name+"'";

};

exports.getExportChoir = function (name, fundationYear, church, gospel, language, effectif, npa) {
    let query = "SELECT * " +
        "FROM `Choir` " +
        "INNER JOIN `Effectif` ON `Choir`.EffectifId = `Effectif`.EffectifId " +
        "INNER JOIN `Location` ON `Choir`.LocationId = `Location`.LocationId " +
        "WHERE 1 = 1";

    if(name !== null)
        query += " AND `Choir`.`Name` = '" + name + "'";

    if(fundationYear !== null)
        query += " AND `Choir`.`FundationYear` = '" + fundationYear + "-01-01" + "'";

    if(church !== null)
        query += " AND `Choir`.`Church` = '" + church + "'";

    if(gospel !== null)
        query += " AND `Choir`.`Gospel` = '" + gospel + "'";

    if(language !== null)
        query += " AND `Choir`.`Language` = '" + language + "'";

    if(effectif !== null)
        query += " AND `Effectif`.`NbMembers` = " + effectif;

    if(npa !== null)
        query += " AND `Location`.`NPA` = '" + npa + "'";

    return query;
};


exports.getAllChoir = function(){
    return "SELECT * FROM `Choir`";
};

exports.getAllTest = function(){
    return "SELECT * FROM `User`";
};