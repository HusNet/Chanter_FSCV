

const C = require('../../config/appConfig');
const AdminMenuDb = require('../controllers/database/admin_menu_db');
const ConfigDb = require('../controllers/database/confg_db');
const Menu = require('../models/menu');


exports.menu = function (req, res, next) {
    res.render('admin/menu/menu');
};


exports.insertMenu = function (req, res, next) {


    console.log(req.body.title);


    C.db.query(AdminMenuDb.insert(req.body.title), function(err, rows, fields) {
        if (err) throw err;

        if(req.body.mainMenu)
            C.db.query(ConfigDb.updateMainMenu(rows.insertId), function(err, rows, fields){

                res.render('admin/menu/menu_inserted', {success: rows.affectedRows});

            });
        else
            res.render('admin/menu/menu_inserted', {success: rows.affectedRows});
    });

};


exports.getAllMenusEdit = function (req, res, next){

    C.db.query(AdminMenuDb.getAll(), function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/menu/menu_edit', {menus: rows});

    });
};


exports.getMenuById = function (req, res, next) {

    C.db.query(AdminMenuDb.getAll(), function (err, all_menus, fields) {
        if (err) throw(err);

        C.db.query(AdminMenuDb.getById(req.query.id), function (err, menu_selected, fields){
            if (err) throw(err);

            C.db.query(ConfigDb.getConfig(), function (err, config, fields){
               if (err) throw(err);

                // TODO : Get also pages from menu_has_page and show them

                let menu = new Menu(menu_selected[0]);
                let menus = [];

                all_menus.forEach(function(menu) {
                    menus.push(new Menu(menu));
                });

                res.render('admin/menu/menu_edit_byId', {menus: menus, menu: menu, config: config[0]});

            });
        });
    });
};


exports.updateMenu = function (req, res, next){

    C.db.query(AdminMenuDb.update(req.body.id_selected_menu, req.body.title), function (err, rows, fields){
        if(err) throw(err);

        if(req.body.mainMenu)
            C.db.query(ConfigDb.updateMainMenu(req.body.id_selected_menu), function(err, rows, fields){
                res.render('admin/menu/menu_edited', {success: rows.affectedRows});
            });
        else
            res.render('admin/menu/menu_edited', {success: rows.affectedRows});

    });

};

exports.getAllMenusDelete = function (req, res, next){

    C.db.query(AdminMenuDb.getAll(), function (err, rows, fields) {
        if (err) throw(err);

        res.render('admin/menu/menu_delete', {menus: rows});

    });
};

exports.deleteMenu = function (req, res, next) {

    C.db.query(AdminMenuDb.delete(req.query.id), function(err, rows, fields){
        if (err) res.render('admin/menu/menu_deleted', {success: false});

        res.render('admin/menu/menu_deleted', {success: true});

    });

};