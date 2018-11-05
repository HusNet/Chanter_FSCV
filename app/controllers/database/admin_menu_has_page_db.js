
exports.getPages_MenusFromMenu = function (id) {
    return "SELECT * FROM \n" +
        "(SELECT * FROM (\n" +
        "SELECT \n" +
        "`Menu_idMenu`,\n" +
        "(SELECT `idTranslation` FROM `Translations` WHERE `idFR` = `PageId` OR `idDE` = `PageId`) AS `idChild`, \n" +
        "(SELECT `Name_fr` FROM \n" +
        "(SELECT `idTranslation`, `Title` AS `Name_fr` FROM \n" +
        "(SELECT * FROM `Translations` WHERE `idFR` IN \n" +
        "(SELECT `PageId` FROM `Page`)) se\n" +
        "JOIN `Page` ON `PageId` = `idFR`)se2\n" +
        "INNER JOIN \n" +
        "(SELECT `idTranslation`, `Title` AS `Name_de`  FROM \n" +
        "(SELECT * FROM `Translations` WHERE `idDE` IN \n" +
        "(SELECT `PageId` FROM `Page`)) se\n" +
        "JOIN `Page` ON `PageId` = `idDE`)se3\n" +
        "ON se2.`idTranslation` = se3.`idTranslation`\n" +
        "WHERE `se2`.`idTranslation` = `idChild`\n" +
        ") AS `Name_fr`,\n" +
        "(SELECT `Name_de` FROM \n" +
        "(SELECT `idTranslation`, `Title` AS `Name_fr` FROM \n" +
        "(SELECT * FROM `Translations` WHERE `idFR` IN \n" +
        "(SELECT `PageId` FROM `Page`)) se\n" +
        "JOIN `Page` ON `PageId` = `idFR`)se2\n" +
        "INNER JOIN \n" +
        "(SELECT `idTranslation`, `Title` AS `Name_de`  FROM \n" +
        "(SELECT * FROM `Translations` WHERE `idDE` IN \n" +
        "(SELECT `PageId` FROM `Page`)) se\n" +
        "JOIN `Page` ON `PageId` = `idDE`)se3\n" +
        "ON se2.`idTranslation` = se3.`idTranslation`\n" +
        "WHERE `se2`.`idTranslation` = `idChild`\n" +
        ") AS `Name_de`,\n" +
        "0 AS `IsMenu`, \n" +
        "`Order` \n" +
        "FROM `Page`\n" +
        "JOIN `Translations` \n" +
        "ON `Page`.`PageId` = `Translations`.`idFR`\n" +
        "OR `Page`.`PageId` = `Translations`.`idDE`\n" +
        "JOIN `Menu_has_Page` ON `Translations`.`idTranslation` = `Menu_has_Page`.`Page_PageId`\n" +
        "GROUP BY `idChild`\n" +
        ") se4\n" +
        "UNION ALL\n" +
        "SELECT * FROM (\n" +
        "SELECT `Menu_idMenu` AS `idMenu`, `idMenu` AS `idChild`, `Name_fr`, `Name_de`, 1 AS `IsMenu`, `Order` FROM `Menu`\n" +
        "JOIN `Menu_has_Page` ON `Menu`.`idMenu` = `Menu_has_Page`.`Menu_SubMenu`\n" +
        "WHERE `idMenu` IN (\n" +
        "SELECT `Menu_SubMenu` FROM `Menu_has_Page`))sel1) sel_tot\n" +
        "WHERE `Menu_idMenu` = " + id + "\n" +
        "ORDER BY `Order`;";


};

exports.getOrdered = function(id){
        return "SELECT * FROM `Menu_has_Page` WHERE `Menu_idMenu` = " + id + " ORDER BY `Order` ASC";
};

exports.invertChildOrder = function(menuId, order_1, order_2) {
    return "UPDATE `Menu_has_Page` AS t1, `Menu_has_Page` AS t2\n" +
        "SET t1.`Page_PageId` = t2.`Page_PageId`, t2.`Page_PageId` = t1.`Page_PageId`, \n" +
        "\tt1.`Menu_SubMenu` = t2.`Menu_SubMenu`, t2.`Menu_SubMenu` = t1.`Menu_SubMenu`\n" +
        "WHERE t1.`Order` = " + order_1 + " AND t2.`Order` = " + order_2 + " AND t1.`Menu_idMenu` = " + menuId + " AND t2.`Menu_idMenu` = " + menuId + ";";
};

exports.getNextOrder = function(idMenu){
    return "SELECT Count(*) AS `Order` FROM `Menu_has_Page` WHERE `Menu_idMenu` = " + idMenu + ";";
};

exports.addMenuInMenu = function(idMenu, idChild, Order){
    return "INSERT INTO `Menu_has_Page` (`Menu_idMenu`, `Menu_SubMenu`, `Order`) VALUE (" + idMenu + ", " + idChild + ", " + Order + ");";
};

exports.addPageInMenu = function(idMenu, idChild, Order){
    return "INSERT INTO `Menu_has_Page` (`Menu_idMenu`, `Page_PageId`, `Order`) VALUE (" + idMenu + ", (SELECT `idTranslation` FROM `Translations` WHERE `idFR` = " + idChild + " OR `idDE` = " + idChild + " LIMIT 1), " + Order + ");";
};

exports.deleteMenuFromMenu = function(idMenu, idChild){
    return "DELETE FROM `Menu_has_Page` WHERE `Menu_idMenu` = " + idMenu + " AND `Menu_SubMenu` = " + idChild + " LIMIT 1;";
};

exports.deletePageFromMenu = function(idMenu, idChild){
    return "DELETE FROM `Menu_has_Page` WHERE `Menu_idMenu` = " + idMenu + " AND `Page_PageId` = " + idChild + " LIMIT 1;";
};

exports.rearangeOrder = function(dbRows){
    let query = "";
    let idMenu = dbRows[0].Menu_idMenu;
    let order = [];

    dbRows.forEach(function(row){
        order.push(row.Order);
    });

    query += "UPDATE `Menu_has_Page` " +
        "SET `Order` = (case ";

    for (let i = 0; i < dbRows.length; i++){
        query += "WHEN `Order` = " + order[i] + " THEN " + i + " ";
    }

    query += " END) WHERE `Menu_idMenu` = " + idMenu + ";";

    return query;
};