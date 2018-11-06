const C = require('../../config/appConfig');

const MenuRenderDb = require('../controllers/database/menu_render_db');
const Menu_Child = require('../models/Menu_Child');

exports.menuRender = function(req, res, next, callback){
    C.db.query(MenuRenderDb.getMainMenuId(), function(err, rows, fields){
        let mainMenuId = rows[0].MainMenuId;
        C.db.query(MenuRenderDb.getMenus(), function(err, rows, fields){

            // TODO : get pages from right lang (req.query.i18n_lang)

            // populate main menu
            let mainMenu = [];
            rows.forEach(function(item){
                if (item.idMenu === mainMenuId)
                    mainMenu.push(new Menu_Child(item));
            });

            mainMenu.forEach(function(item){
                if (Boolean(item.IsMenu?1:0)){
                    let subMenuId = item.idChild;
                    let subMenu = [];
                    rows.forEach(function (item) {
                        if (item.idMenu === subMenuId) {
                            subMenu.push(new Menu_Child(item));
                        }
                    });

                    mainMenu[mainMenu.findIndex(
                        function(item){
                            return item.idChild === subMenuId;
                        })].content = subMenu;
                }
            });

            //sort array by Order
            mainMenu.sort(function(a, b){return a.Order - b.Order});

            callback(req, res, next, mainMenu);

        });
    });
};

exports.index = function(req, res, next){

    this.menuRender(req, res, next, function (req, res, next, mainMenu){

        if (req.query.err)
            res.render('404', {mainMenu: mainMenu, title: '404 not found!'});
        else if (req.query.id) {
            // multi lang
            let query = "";
            if (req.i18n_lang === 'fr')
                query = MenuRenderDb.getPageContent_FR(req.query.id);
            else
                query = MenuRenderDb.getPageContent_DE(req.query.id);

            C.db.query(query, function(err, rows, fields){
                if(err) throw(err);
                res.render('public/render', {page: rows[0], mainMenu: mainMenu});
            });
        } else {
            C.db.query(MenuRenderDb.getMainPageId(), function (err, rows, fields) {
                let mainPageId = rows[0].HomePageId;

                // multi lang
                let query = "";
                if (req.i18n_lang === 'fr')
                    query = MenuRenderDb.getPageContent_FR(mainPageId);
                else
                    query = MenuRenderDb.getPageContent_DE(mainPageId);

                C.db.query(query, function(err, rows, fields){
                    if(err) throw(err);
                    res.render('public/render', {page: rows[0], mainMenu: mainMenu});
                });
            });
        }
    });
};

