const C = require('../../config/appConfig');
const AdminPageDb = require('../controllers/database/admin_page_db');

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
    let user = 1; // req.session.user
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

    res.redirect('admin/news/news');
};

exports.form_edit_news = function(req, res, next) {
    let idNews = req.query.id;
    let query = AdminPageDb.getNewsById(idNews);

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/news/news_edit', {news: rows});
    });
};

/**
 *
 * PAGE PART
 *
 */