const C = require('../../config/appConfig');
const AdminMenuDb = require('../controllers/database/admin_menu_db');


exports.menu = function (req, res, next) {
    res.render('admin/menu/menu');
};

exports.getAllMenus = function (req, res, next){

    let query = AdminMenuDb.getAll();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/menu/menu_edit', {menus: rows});

    });
};


exports.insertMenu = function (req, res, next) {

};