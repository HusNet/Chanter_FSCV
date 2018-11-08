
const C = require('../../config/appConfig');
const AdminMenuDb = require('../controllers/database/admin_menu_db');
const MenuHasPageDb = require('../controllers/database/admin_menu_has_page_db');
const ConfigDb = require('../controllers/database/confg_db');
const PageDb = require('../controllers/database/admin_page_db');
const Menu = require('../models/menu');
const Page = require('../models/page');
const Menu_Child = require('../models/Menu_Child');

exports.menu = function (req, res, next) {
    res.render('admin/menu/menu');
};


exports.insertMenu = function (req, res, next) {


    C.db.query(AdminMenuDb.insert(req.body.title_fr, req.body.title_de), function(err, rows, fields) {
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

let getMenuById_Data = function(menuId, callback){
    C.db.query(AdminMenuDb.getAll(), function (err, all_menus, fields) {
        if (err) throw(err);

        C.db.query(AdminMenuDb.getById(menuId), function (err, menu_selected, fields){
            if (err) throw(err);

            C.db.query(ConfigDb.getConfig(), function (err, config, fields){
                if (err) throw(err);

                C.db.query(PageDb.getPages(), function (err, all_pages, fields) {
                    if (err) throw(err);

                    C.db.query(MenuHasPageDb.getPages_MenusFromMenu(menuId), function(err, pages_menus_in_menu, fields){

                        // populate menus list
                        let menus = [];
                        if (all_menus.length)
                            all_menus.forEach(function(menu) {
                                menus.push(new Menu(menu));
                            });

                        // populate selected menu
                        let menu = [];
                        if (menu_selected.length)
                            menu = new Menu(menu_selected[0]);

                        // populate pages
                        let pages = [];
                        if (all_pages.length)
                            all_pages.forEach(function (page){
                                pages.push(new Page(page));
                            });


                        // populate child
                        let children = [];
                        pages_menus_in_menu.forEach(function(child) {
                            children.push(new Menu_Child(child));
                        });

                        //possible children
                        let available_children = [];
                        menus.forEach(function(menu) {
                            available_children.push(new Menu_Child({
                                idMenu: undefined,
                                idChild: menu.idMenu,
                                Name_fr: menu.Name_fr,
                                Name_de: menu.Name_de,
                                IsMenu: 1,
                                Order: undefined
                           }));
                        });

                        pages.forEach(function(page){
                           available_children.push(new Menu_Child({
                                idMenu: undefined,
                                idChild: page.PageId,
                                Name_fr: page.Title,
                                Name_de: page.Title,
                                IsMenu: 0,
                                Order: undefined
                           }));
                        });


                        // take this menu/page out of list
                        available_children.splice(available_children.findIndex(
                            function(item){
                                return item.idChild === menu.idMenu;
                            }
                        ), 1);

                        console.log(MenuHasPageDb.getPages_MenusFromMenu(menuId));
                        console.log(pages_menus_in_menu);

                        callback({config: config[0], menus: menus, menu: menu, pages: pages, children: children, available_children: available_children});

                    });
                });
            });
        });
    });
};


exports.getMenuByIdAsJSON = function (req, res, next){
    getMenuById_Data(req.query.id, function (data) {
        data['lang'] = req.i18n_lang;
        res.json(data);
    });
};

exports.getMenuById = function (req, res, next) {
    getMenuById_Data(req.query.id, function (data) {
        data['lang'] = req.i18n_lang;
        res.render('admin/menu/menu_edit_byId', data);
    });
};

exports.invertChildOrder = function (req, res, next) {

    // -1 because id starts at 1 and Order at 0
    let order_1 = parseInt(req.query.childOrder);
    let order_2 = parseInt(order_1) + parseInt(req.query.nextChild);

    C.db.query(MenuHasPageDb.invertChildOrder(req.query.id, order_1, order_2), function (err, rows, fields){
        res.json(rows.affectedRows);
    });
};

exports.addChildInMenu = function (req, res, next) {
    let idMenu = parseInt(req.query.id);
    let idChild = parseInt(req.query.idChild);
    let isMenu = Boolean(parseInt(req.query.isMenu)?1:0);

    C.db.query(MenuHasPageDb.getNextOrder(idMenu), function (err, rows, field){
        if(err) throw(err);

        let order = rows[0].Order;

        if (isMenu) {
            C.db.query(MenuHasPageDb.addMenuInMenu(idMenu, idChild, order), function (err, rows, field) {
                if (err) throw(err);
                res.json(rows.affectedRows);
            });
        }else {
            C.db.query(MenuHasPageDb.addPageInMenu(idMenu, idChild, order), function (err, rows, field) {
                if (err) throw(err);
                res.json(rows.affectedRows);
            });
        }
    });
};

exports.deleteChildInMenu = function(req, res, next){
    let idMenu = parseInt(req.query.id);
    let idChild = req.query.idChild;
    let isMenu = Boolean(parseInt(req.query.isMenu)?1:0);

    if (isMenu) {
        C.db.query(MenuHasPageDb.deleteMenuFromMenu(idMenu, idChild), function(err, rows, field){
           if(err) throw(err);
           rearrangeDb(idMenu);
           res.json(rows.affectedRows);
        });
    }else {
        C.db.query(MenuHasPageDb.deletePageFromMenu(idMenu, idChild), function(err, rows, field){
            if(err) throw(err);
            rearrangeDb(idMenu);
            res.json(rows.affectedRows);
        });
    }
};

function rearrangeDb(idMenu){

    C.db.query(MenuHasPageDb.getOrdered(idMenu), function (err, rows, field) {
        if(err) throw(err);
        C.db.query(MenuHasPageDb.rearangeOrder(rows), function(err, rows, field){
            if(err) throw(err);
        });
    });
}

exports.updateMenu = function (req, res, next){

    C.db.query(AdminMenuDb.update(req.body.id_selected_menu, req.body.title_fr, req.body.title_de), function (err, rows, fields){
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


