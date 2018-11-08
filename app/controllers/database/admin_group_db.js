exports.insertGroup = function (modelGroup) {
    return "INSERT INTO Groups (Name, SubGroups, USC, FSCV, DateUSC, DateFSCV, MembershipDate) " +
        "VALUES ('" + modelGroup.Name + "', '" + modelGroup.SubGroups + "', '" + modelGroup.USC + "', '" + modelGroup.FSCV + "', '" + modelGroup.DateUSC + "', '" + modelGroup.DateFSCV + "', '" + modelGroup.DateGroupe + "')";
};
exports.getGroupsFromId = function (groupsId) {
    return "SELECT * FROM `Groups` WHERE `GroupsId` =  '" + groupsId + "'";

};

exports.editGroups = function(id, model) {
    return  "UPDATE `Groups` " +
        "SET `Name` = '" + model.Name + "',`SubGroups` = '" + model.SubGroups + "', " +
        "`USC` = '" + model.USC + "',`FSCV` = '" + model.FSCV + "', " +
        "`DateUSC` = '" + model.DateUSC + "',`DateFSCV` = '" + model.DateFSCV + "',`MembershipDate` = '" + model.DateGroupe + "'" +
        "WHERE `GroupsId` = " + id;
};
