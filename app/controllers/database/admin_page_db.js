/**
 * NEWS PART
**/

exports.addNews = function(news) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `IsNews`, `FormularForms`, `FormularResult`) " +
            "VALUES ('" + news.Title + "', '" + news.Content + "', '" + news.AdminId + "', '" + news.Published_date + "', '" + news.Updated_date + "', '" + news.IsNews + "', '" + news.FormularForms + "', '" + news.FormularResult + "')";
};

exports.editNews = function(id, title, content, updated_date) {
    return  "UPDATE Page " +
            "SET `Title` = '" + title + "', `Content` = '" + content + "', `Updated_date` = '" + updated_date + "' " +
            "WHERE `PageId` = " + id;
};

exports.getNews = function() {return "SELECT * FROM `Page` \n" +
    "JOIN `Translations`\n" +
    "ON `Page`.`PageId` = `Translations`.`idFR`\n" +
    "OR `Page`.`PageId` = `Translations`.`idDE`\n" +
    "WHERE `IsNews` = 1;";
};

exports.getNewsById = function (id) {
  return "SELECT * FROM Page WHERE `IsNews` = 1 AND `PageId` = " + id;
};

exports.deleteNews = function(id) {
    return "DELETE FROM `Translations` WHERE `idFR` = " + id + " OR `idDE` = " + id + ";";
};

/**
 * PAGE PART
 **/

exports.getPages = function() {
    return "SELECT * FROM `Page` \n" +
        "JOIN `Translations`\n" +
        "ON `Page`.`PageId` = `Translations`.`idFR`\n" +
        "OR `Page`.`PageId` = `Translations`.`idDE`\n" +
        "WHERE `IsNews` = 0;";
};

exports.addPage = function(page) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `IsNews`) " +
        "VALUES ('" + page.Title + "', '" + page.Content + "', '" + page.AdminId + "', '" + page.Published_date + "', '" + page.Updated_date + "', '" + page.IsNews + "')";
};

exports.deletePage = function(id) {
    return "DELETE FROM `Translations` WHERE `idFR` = " + id + " OR `idDE` = " + id + ";";
};

exports.getPageById = function (id) {
    return "SELECT * FROM Page WHERE `IsNews` = 0 AND `PageId` = " + id;
};

exports.editPage = function(id, title, content, updated_date) {
    return  "UPDATE Page " +
            "SET `Title` = '" + title + "', `Content` = '" + content + "', `Updated_date` = '" + updated_date + "' " +
            "WHERE `PageId` = " + id;
};

exports.linkPage = function (idFR, idDE) {
    return  "INSERT INTO `Translations` (`idFR`, `idDE`) VALUES (" + idFR + ", " + idDE + ");";
};

exports.getDEPage = function (idFR) {
    return "SELECT * FROM `Page` WHERE `PageId` = (SELECT `idDE` FROM `Translations` WHERE `idFR` = " + idFR + " LIMIT 1);";
};

exports.getFRPage = function (idDE) {
    return "SELECT * FROM `Page` WHERE `PageId` = (SELECT `idFR` FROM `Translations` WHERE `idDE` = " + idDE + " LIMIT 1);";
};

exports.getTranslation = function (idTranslation) {
    return "SELECT * FROM `Translations` WHERE `idTranslation = " + idTranslation + ";";
};

exports.isFR = function (idPage) {
    return "SELECT Count(*) FROM `Translations` WHERE `idFR` = " + idPage + ";";
};