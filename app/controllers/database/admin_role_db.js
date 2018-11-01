exports.getIdRole = function (name) {
   return "SELECT RoleId FROM `Role` WHERE `Name` = '" + name + "'";
}


exports.getNameRole = function (roleId) {
    return "SELECT * FROM `Role` WHERE `RoleId` = '" + roleId + "'";
}


exports.getNameR = function (tabIdRole) {

    let query = "SELECT * FROM `Role` WHERE `RoleId` IN (";
    tabIdRole.forEach(function(id, idx) {
        if (idx === tabIdRole.length-1){
            query += tabIdRole[idx].RoleId + "";
        }
        else {
            query += tabIdRole[idx].RoleId + ", ";
        }
    });
    query += ");";
    return query;


}






