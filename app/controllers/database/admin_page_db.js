/**
 * NEWS PART
**/

exports.addNews = function(news) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `FormularForms`, `FormularResult`) " +
            "VALUES ('" + news.Title + "', '" + news.Content + "', '" + news.AdminId + "', '" + news.Published_date + "', '" + news.Updated_date + "', '" + news.Lang + "', '" + news.IdPageLang + "', '" + news.IsNews + "', '" + news.FormularForms + "', '" + news.FormularResult + "')";
};

exports.editNews = function(id, title, content, updated_date) {
    return  "UPDATE Page " +
            "SET `Title` = '" + title + "', `Content` = '" + content + "', `Updated_date` = '" + updated_date + "' " +
            "WHERE `PageId` = " + id;
};

exports.getNews = function() {
    return "SELECT * FROM Page WHERE `IsNews` = 1";
};

exports.getNewsById = function (id) {
  return "SELECT * FROM Page WHERE `IsNews` = 1 AND `PageId` = " + id;
};

exports.deleteNews = function(id) {
  return "DELETE FROM Page WHERE `PageId` = " + id;
};

/**
 * PAGE PART
 **/

exports.getPages = function() {
    return "SELECT * FROM Page WHERE `IsNews` = 0";
};

exports.addPage = function(page) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`) " +
        "VALUES ('" + page.Title + "', '" + page.Content + "', '" + page.AdminId + "', '" + page.Published_date + "', '" + page.Updated_date + "', '" + page.Lang + "', '" + page.IdPageLang + "', '" + page.IsNews + "')";
};

exports.deletePage = function(id) {
    return "DELETE FROM Page WHERE `PageId` = " + id;
};

exports.getPageById = function (id) {
    return "SELECT * FROM Page WHERE `IsNews` = 0 AND `PageId` = " + id;
};

exports.editPage = function(id, title, content, updated_date) {
    return  "UPDATE Page " +
            "SET `Title` = '" + title + "', `Content` = '" + content + "', `Updated_date` = '" + updated_date + "' " +
            "WHERE `PageId` = " + id;
};

exports.linkPage = function (idPage, idToLink) {
    return  "UPDATE Page " +
            "SET `IdPageLang` = '" + idToLink + "'" +
            "WHERE `PageId` = " + idPage;
};

exports.getCorrespondingPage = function (idPage) {
    return "SELECT * FROM Page WHERE `IdPageLang` = " + idPage + " LIMIT 1";
};