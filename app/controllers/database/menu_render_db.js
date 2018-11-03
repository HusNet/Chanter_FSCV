const PageDb = require('../database/admin_page_db');
const ConfigDb = require('../database/confg_db');

exports.getMainMenuId = function(){
    return ConfigDb.getMainMenuId();
};

exports.getMainPageId = function(){
    return ConfigDb.getMainPageId();
};

exports.getMenus = function(){
  return "SELECT * FROM (\n" +
      "\tSELECT `Menu_idMenu` AS `idMenu`, `PageId` AS `idChild`, `Title` AS `Name`, 0 AS `IsMenu`, `Order` FROM `Page` \n" +
      "\tJOIN `Menu_has_Page` ON `Page`.`PageId` = `Menu_has_Page`.`Page_PageId`\n" +
      "\tWHERE `PageId` IN (\n" +
      "\tSELECT `Page_PageId` FROM `Menu_has_Page`) ) sel_1\n" +
      "\tUNION ALL (\n" +
      "\tSELECT * FROM (\n" +
      "\tSELECT `Menu_idMenu` AS `idMenu`, `idMenu` AS `idChild`, `Name`, 1 AS `IsMenu`, `Order` FROM `Menu`\n" +
      "\tJOIN `Menu_has_Page` ON `Menu`.`idMenu` = `Menu_has_Page`.`Menu_SubMenu`\n" +
      "\tWHERE `idMenu` IN (\n" +
      "\tSELECT `Menu_SubMenu` FROM `Menu_has_Page`) ) sel_2)\n" +
      "\tORDER BY `idMenu`;\n" +
      "\n";
};

exports.getPageContent = function(id){
  return PageDb.getPageById(id);
};