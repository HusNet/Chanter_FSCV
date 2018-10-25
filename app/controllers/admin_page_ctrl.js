const C = require('../../config/appConfig');
const AdminPageDb = require('../controllers/database/admin_page_db');
const PageModel = require('../models/page');

/**
 *
 * NEWS PART
 *
 */

exports.news = function(req, res, next) {

    let query = AdminPageDb.getNews();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        res.render('admin/news/news', {news: rows})
    });
};

exports.form_news = function(req, res, next) {
    res.render('admin/news/news_add');
};

exports.add_news = function(req, res, next) {

    let titleFr = req.body.titlefr;
    let titleDe = req.body.titlede;
    let contentFr = req.body.contentfr;
    let contentDe = req.body.contentde;
    let user = req.session.user;
    let date_publish = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let idPageLang = 1; // id de la meme page mais dans l'autre langue
    let isNews = 1;

    let newsFr = new PageModel({
        Title: titleFr,
        Content: contentFr,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        Lang: 'fr',
        IsNews: isNews,
        IdPageLang: idPageLang
    });

    let newsDe = new PageModel({
        Title: titleDe,
        Content: contentDe,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        Lang: 'de',
        IsNews: isNews,
        IdPageLang: idPageLang
    });

    let queryFr = AdminPageDb.addNews(newsFr);
    let queryDe = AdminPageDb.addNews(newsDe);

    C.db.query(queryFr, function (err, rows, fields) {
        if (err) throw(err);
    });

    C.db.query(queryDe, function (err, rows, fields) {
        if (err) throw(err);
    });

    res.redirect('/admin/news');
};

exports.form_edit_news = function(req, res, next) {
    let idNews = req.query.id;
    let query = AdminPageDb.getNewsById(idNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/news/news_edit', {news: rows});
    });
};

exports.edit_news = function (req, res, next) {
    let idNews = req.body.idNews;
    let title = req.body.title;
    let content = req.body.contentUpdated;
    let updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = AdminPageDb.editNews(idNews, title, content, updated_date);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/news');
    });
};

exports.delete_news = function (req, res, next) {
    let idNews = req.query.id;
    let query = AdminPageDb.deleteNews(idNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/news');
    });
};

/**
 *
 * PAGE PART
 *
 */

exports.page = function(req, res, next) {

    let query = AdminPageDb.getPages();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/page/page', {pages: rows})
    });
};

exports.form_page = function(req, res, next) {
    res.render('admin/page/page_add');
};

exports.add_page = function (req, res, next) {
    let titleFr = req.body.titlefr;
    let titleDe = req.body.titlede;
    let contentFr = req.body.contentfr;
    let contentDe = req.body.contentde;
    let user = req.session.user;
    let date_publish = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let idPageLang = 1; // id de la meme page mais dans l'autre langue
    let isNews = 0;

    let newsFr = new PageModel({
        Title: titleFr,
        Content: contentFr,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        Lang: 'fr',
        IsNews: isNews,
        IdPageLang: idPageLang
    });

    let newsDe = new PageModel({
        Title: titleDe,
        Content: contentDe,
        AdminId: user,
        Published_date: date_publish,
        Updated_date: date_publish,
        Lang: 'de',
        IsNews: isNews,
        IdPageLang: idPageLang
    });

    let queryFr = AdminPageDb.addPage(newsFr);
    let queryDe = AdminPageDb.addPage(newsDe);

    C.db.query(queryFr, function (err, rows, fields) {
        if (err) throw(err);
    });

    C.db.query(queryDe, function (err, rows, fields) {
        if (err) throw(err);
    });

    res.redirect('/admin/page');
};

exports.delete_page = function (req, res, next) {
    let idPage = req.query.id;
    let query = AdminPageDb.deletePage(idPage);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/page');
    });
};

exports.form_edit_page = function(req, res, next) {
    let idPage = req.query.id;
    let query = AdminPageDb.getPageById(idPage);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/page/page_edit', {pages: rows});
    });
};

exports.edit_page = function (req, res, next) {
    let idPage = req.body.idPage;
    let title = req.body.title;
    let content = req.body.contentUpdated;
    let updated_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = AdminPageDb.editPage(idPage, title, content, updated_date);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.redirect('/admin/page');
    });
};
