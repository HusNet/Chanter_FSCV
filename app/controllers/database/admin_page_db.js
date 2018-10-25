
exports.addNews = function(news) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`) " +
            "VALUES ('" + news.Title + "', '" + news.Content + "', '" + news.AdminId + "', '" + news.Published_date + "', '" + news.Updated_date + "', '" + news.Lang + "', '" + news.IdPageLang + "', '" + news.IsNews + "')";
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