const C = require('../../config/appConfig');

const MenuRenderDb = require('../controllers/database/menu_render_db');
const Menu_Child = require('../models/Menu_Child');

exports.index = function(req, res, next){
    C.db.query(MenuRenderDb.getMainMenuId(), function(err, rows, fields){
        let mainMenuId = rows[0].MainMenuId;
        C.db.query(MenuRenderDb.getMenus(), function(err, rows, fields){

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

            if (req.query.id) {
                C.db.query(MenuRenderDb.getPageContent(req.query.id), function(err, rows, fields){
                    if(err) throw(err);
                    res.render('public/render', {page: rows[0], mainMenu: mainMenu});
                });
            } else {
                C.db.query(MenuRenderDb.getMainPageId(), function (err, rows, fields) {
                    let mainPageId = rows[0].HomePageId;
                    C.db.query(MenuRenderDb.getPageContent(mainPageId), function(err, rows, fields){
                        if(err) throw(err);
                        res.render('public/render', {page: rows[0], mainMenu: mainMenu});
                    });
                });
            }
        });
    });
};

