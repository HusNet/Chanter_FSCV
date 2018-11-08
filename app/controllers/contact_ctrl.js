const MenuRender = require('../controllers/render_ctrl');

exports.contact = function(req, res, next) {
    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('contact/contact', {mainMenu: mainMenu, lang: req.i18n_lang});
    });
};

exports.send = function (req, res, next) {
    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('contact/send', {mainMenu: mainMenu, lang: req.i18n_lang});
    });
};