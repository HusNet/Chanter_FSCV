const C = require('../../config/appConfig');

function page(rows) {
    this.PageId = rows.PageId;
    this.Title = rows.Title;
    this.Content = rows.Content;
    this.Published_date = rows.Published_date;
    this.Updated_date = rows.Updated_date;
    this.Lang = rows.Lang;
    this.IdPageLang = rows.IdPageLang;
    this.IsNews = rows.IsNews;
    this.AdminId = rows.AdminId;
}

module.exports = page;