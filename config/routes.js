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

    router.get('/admin/page', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.page(req, res, next);
    });

    router.get('/admin/choir', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.choir(req, res, next);
    });

    // *** MENU ROUTES
    router.get('/admin/person', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminPerson.person(req, res, next);
    });

   router.get('/admin/person/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_add');
    });

    router.post('/admin/person/add', function(req, res, next) {
        adminPerson.admin_person_insert(req, res, next);
    });

    router.get('/admin/person/update', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_update');
    });

    router.get('/admin/person/delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        res.render('admin/person/person_delete');
    });


    // *** END PERSON ROUTES

    router.get('/admin/news', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        admin.news(req, res, next);
    });

    router.post('/admin/news', function(req, res, next) {
        admin.add_news(req, res, next);
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

    router.get('/admin/menu/update', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.getAllMenus(req, res, next);
    });

    router.get('/admin/menu/delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.getAllMenus(req, res, next);
    });

// *** END

};
