module.exports = function(app, router) {

    app.use(router);
    app.use(function(req, res){
        res.status(404).render('404', {
            title: 'Page not found (AKA 404 Error)'
        });
    });

    //home routes
    let home = require('../app/controllers/home_ctrl');
    //admin login
    let admin = require('../app/controllers/admin_ctrl');
    //contact routes
    let contact = require('../app/controllers/contact_ctrl');
    let adminMenu = require('../app/controllers/admin_menu_ctrl');
    let adminPerson = require('../app/controllers/admin_person_ctrl');
    let adminPage = require('../app/controllers/admin_page_ctrl');

    router.get('/', function(req, res, next) {
        home.index(req, res, next);
    });

    router.get('/contact', function(req, res, next) {
        contact.contact(req, res, next);
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


    router.get('/admin/choir', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.choir(req, res, next);
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

    router.get('/admin/export', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.export(req, res, next);
    });


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

// *** END PAGE ROUTES

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

    router.get('/admin/person/person_edit', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_edit');
    });

    router.post('/admin/person/person_edit', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.admin_person_edit(req, res, next);
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

        if (req.query.id)
            adminMenu.getMenuById(req, res, next);
        else
            adminMenu.getAllMenusEdit(req, res, next);
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
