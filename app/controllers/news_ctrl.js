const MenuRender = require('../controllers/render_ctrl');
const C = require('../../config/appConfig');
const NewsDb = require('../controllers/database/admin_page_db');

exports.news = function(req, res, next) {

    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {

        C.db.query(NewsDb.getNews(), function(err, rows, fields) {

            console.log(rows);

            res.render('news/news', {news: rows, mainMenu: mainMenu, lang: req.i18n_lang});
        });
    });
};