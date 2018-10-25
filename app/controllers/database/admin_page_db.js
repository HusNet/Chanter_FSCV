
exports.addNews = function(news) {
    return  "INSERT INTO Page (`Title`, `Content`, `AdminId`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`) " +
            "VALUES ('" + news.Title + "', '" + news.Content + "', '" + news.AdminId + "', '" + news.Published_date + "', '" + news.Updated_date + "', '" + news.Lang + "', '" + news.IdPageLang + "', '" + news.IsNews + "')";
};

exports.getNews = function() {
    return "SELECT * FROM Page WHERE `IsNews` = 1";
};

exports.getNewsById = function (id) {
  return "SELECT * FROM Page WHERE `IsNews` = 1 AND `PageId` = " + id;
};