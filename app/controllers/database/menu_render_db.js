const PageDb = require('../database/admin_page_db');
const ConfigDb = require('../database/confg_db');

exports.getMainMenuId = function(){
    return ConfigDb.getMainMenuId();
};

exports.getMainPageId = function(){
    return ConfigDb.getMainPageId();
};

exports.getMenus = function(){
  return "SELECT * FROM \n" +
      "(SELECT * FROM (\n" +
      "SELECT \n" +
      "`Menu_idMenu` AS `idMenu`,\n" +
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
      "ORDER BY `Order`;";
};

exports.getPageContent_FR = function(id){
    return PageDb.getPageById("(SELECT `idFR` FROM `Translations` WHERE `idTranslation` = " + id + " LIMIT 1)");
};

exports.getPageContent_DE = function(id){
    return PageDb.getPageById("(SELECT `idDE` FROM `Translations` WHERE `idTranslation` = " + id + " LIMIT 1)");
};






