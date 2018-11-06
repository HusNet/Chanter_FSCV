module.exports = function(app, router) {

    app.use(router);
    app.use(function(req, res){
        res.status(404);
        req.query.err = 404;
        render.index(req, res);
    });

    //public routes
    let render = require('../app/controllers/render_ctrl');
    //admin login
    let admin = require('../app/controllers/admin_ctrl');
    let calendar = require('../app/controllers/calendar_ctrl');
    let search = require('../app/controllers/search_ctrl');

    let adminMenu = require('../app/controllers/admin_menu_ctrl');
    let adminPerson = require('../app/controllers/admin_person_ctrl');
    let adminPage = require('../app/controllers/admin_page_ctrl');
    let adminExport = require('../app/controllers/admin_export_ctrl');
    let adminChoir = require('../app/controllers/admin_choir_ctrl');


    router.get('/', function(req, res, next) {
        render.index(req, res, next);
    });

    router.get('/calendar', function (req, res, next) {
       calendar.calendar(req, res, next);
    });

    router.get('/search', function (req, res, next) {
       search.search_form(req, res, next);
    });

    router.post('/search/search_choir', function (req, res, next) {
        search.search_choir(req, res, next);
    });

    router.get('/admin', function(req, res, next) {
        admin.login(req, res, next);
    });

    router.get('/admin/logout_do', function(req, res, next) {
        admin.logout_do(req, res, next);
    });

    router.post('/admin', function(req, res, next) {
        admin.login_do(req, res, next);
    });

    router.get('/admin/dashboard', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.dashboard(req, res, next);
    });


    router.get('/admin/service', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.service(req, res, next);
    });

    router.get('/admin/user', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.user(req, res, next);
    });

    router.post('/admin/user', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.add_user(req, res, next);
    });

// *** PAGE EXPORT

    router.get('/admin/export', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminExport.select_export(req, res, next);
    });

    router.get('/admin/export/export_choir', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminExport.export_form_choir(req, res, next);
    });

    router.post('/admin/export/export_choir', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminExport.export_choir(req, res, next);
    });

    router.get('/admin/export/export_person', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminExport.export_form_person(req, res, next);
    });

    router.post('/admin/export/export_person', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminExport.export_person(req, res, next);
    });

// *** END EXPORT ROUTES

// *** PAGE ROUTES

    router.get('/admin/page', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.page(req, res, next);
    });

    router.get('/admin/page/page_add', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_page(req, res, next);
    });

    router.post('/admin/page/page_add', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.add_page(req, res, next);
    });

    router.get('/admin/page/page_delete', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.delete_page(req, res, next);
    });

    router.get('/admin/page/page_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_edit_page(req, res, next);
    });

    router.post('/admin/page/page_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.edit_page(req, res, next);
    });

    router.get('/admin/page/page_link', function (req, res, next) {
       admin.authenticationTest(req, res, next);
       adminPage.form_link_page(req, res, next);
    });

    router.post('/admin/page/page_link', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.link_page(req, res, next);
    });

    router.post('/admin/page/page_add', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.add_page(req, res, next);
    });

    router.get('/admin/page/page_delete', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.delete_page(req, res, next);
    });

    router.get('/admin/page/page_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_edit_page(req, res, next);
    });

    router.post('/admin/page/page_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.edit_page(req, res, next);
    });

// *** END PAGE ROUTES

// *** END PAGE ROUTES

//*** CHOIR ROUTES
    router.get('/admin/choir', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminChoir.choir(req, res, next);
    });

    /*router.get('/admin/choir/GetRole/:roleName', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminChoir.getRoleByName(req, res, next);
    });*/

    // méthode pour afficher formulaire avec les roles déjà existant
    router.get('/admin/choir/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminChoir.getRoleByName('SuperAdmin').then(function (PersonPresident) {
            adminChoir.getRoleByName('SuperAdmin').then(function (PersonDirector) {
                adminChoir.getRoleByName('SuperAdmin').then(function (PersonSecretaire) {
                    adminChoir.getRoleByName('SuperAdmin').then(function (PersonCaissier) {
                        res.render('admin/choir/choir_add',{
                            PersonPresident:PersonPresident,
                            PersonDirector:PersonDirector,
                            PersonSecretaire:PersonSecretaire,
                            PersonCaissier:PersonCaissier
                        });
                    })
                })
            })
        })

    });
    router.post('/admin/choir/add', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminChoir.addChoir(req, res, next);

    });



    //DELETE CHOIR
    router.get('/admin/choir/delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);

        if (req.query.id)
            adminChoir.deleteChoir(req, res, next);
        else
            adminChoir.getAllChoirDelete(req, res, next);
    });





// *** PERSON ROUTES

    router.get('/admin/person', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.person(req, res, next);
    });

   router.get('/admin/person/person_add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_add');
    });

    router.post('/admin/person/person_add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.admin_person_add(req, res, next);
    });

    router.get('/admin/person/person_edit_search', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_edit_search');
    });

    router.post('/admin/person/person_edit_search', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.admin_person_edit(req, res, next);
    });

    router.get('/admin/person/person_edit_result', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_edit_result');
    });

    router.post('/admin/person/person_edit_result', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.admin_person_edit_result(req, res, next);
    });

    router.get('/admin/person/person_delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_delete');
    });

    router.post('/admin/person/person_delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.admin_person_delete(req, res, next);
    });

    // *** END PERSON ROUTES

    // *** NEWS ROUTES

    router.get('/admin/news', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.news(req, res, next);
    });

    router.get('/admin/news/news_add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_news(req, res, next);
    });

    router.post('/admin/news/news_add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.add_news(req, res, next);
    });

    router.get('/admin/news/news_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_edit_news(req, res, next);
    });

    router.post('/admin/news/news_edit', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.edit_news(req, res, next);
    });

    router.get('/admin/news/news_delete', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.delete_news(req, res, next);
    });

    router.get('/admin/news/news_link', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.form_link_news(req, res, next);
    });

    router.post('/admin/news/news_link', function (req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPage.link_news(req, res, next);
    });

    // *** END NEWS ROUTES

    // *** MENU ROUTES

    router.get('/admin/menu', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.menu(req, res, next);
    });

    router.get('/admin/menu/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/menu/menu_add');
    });

    router.post('/admin/menu/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.insertMenu(req, res, next);
    });

    router.get('/admin/menu/edit', function(req, res, next) {
        admin.authenticationTest(req, res, next);

        if (req.query.id){
            if (req.query.childOrder && req.query.nextChild)
                adminMenu.invertChildOrder(req, res, next);
            else if (req.query.idChild && req.query.isMenu && req.query.del)
                adminMenu.deleteChildInMenu(req, res, next);
            else if(req.query.idChild && req.query.isMenu)
                adminMenu.addChildInMenu(req, res, next);
            else
                adminMenu.getMenuById(req, res, next);
        }
        else
            adminMenu.getAllMenusEdit(req, res, next);
    });

    router.get('/admin/menu/json/edit', function(req, res, next){
       admin.authenticationTest(req, res, next);
       if (req.query.id)
           adminMenu.getMenuByIdAsJSON(req, res, next);
    });

    router.post('/admin/menu/edit', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.updateMenu(req, res, next);
    });

    router.get('/admin/menu/delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);

        if (req.query.id)
            adminMenu.deleteMenu(req, res, next);
        else
            adminMenu.getAllMenusDelete(req, res, next);
    });

    // *** END MENU ROUTES

};
