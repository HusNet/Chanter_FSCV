const AdminUtilsDb = require('../controllers/database/utils/db_utils');
const PageModel = require('../models/page');

exports.replaceSimpleQuote = function (s) {
    return s.replace(/'/g, "\\'");
};

exports.exportPageData = function (rows) {
    let pageModel = [];

    rows.forEach(function (row) {
        pageModel.push(new PageModel(row));
    });

    let query =
        "START TRANSACTION;\n" +
        "USE `chanter-dev`;\n" ;

    pageModel.forEach(function (page) {
        query += "INSERT INTO  `chanter-dev`.`Page` (`PageId`, `Title`, `Content`, `Published_date`, `Updated_date`, `Lang`, `IdPageLang`, `IsNews`, `AdminId`)" +
            "VALUES (" + page.PageId + ", '" + AdminUtilsDb.replaceSimpleQuote(page.Title) + "', '" + AdminUtilsDb.replaceSimpleQuote(page.Content) + "', '" + new Date(page.Published_date).toISOString().slice(0, 19).replace('T', ' ') + "', '" + new Date(page.Updated_date).toISOString().slice(0, 19).replace('T', ' ') + "', " +
            "'" + page.Lang + "', " + page.IdPageLang + ", "+ page.IsNews+", " + page.AdminId + ");\n";
    });

    query += "COMMIT;\n";

    return query;
}