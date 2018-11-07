const MenuRender = require('../controllers/render_ctrl');

exports.calendar = function(req, res, next) {

    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('calendar/calendar', {mainMenu: mainMenu});
    });
};