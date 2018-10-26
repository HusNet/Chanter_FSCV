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

    let adminPerson = require('../app/controllers/admin_person_ctrl');
    let adminPage = require('../app/controllers/admin_page_ctrl');

    let choir = require('../app/controllers/admin_choir_ctrl');


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
// ** Choir start routes
    router.get('/admin/choir', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        choir.choir(req, res, next);
    });

    router.get('/admin/choir/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        choir.getRoleByName('SuperAdmin').then(function (PersonPresident) {
            choir.getRoleByName('SuperAdmin').then(function (PersonDirector) {
                choir.getRoleByName('SuperAdmin').then(function (PersonSecretaire) {
                    choir.getRoleByName('SuperAdmin').then(function (PersonCaissier) {
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

    router.post('/admin/choir/add', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.insertChoir(req, res, next);
    });

    router.get('/admin/choir/update', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.getAllChoir(req, res, next);
    });

    router.get('/admin/choir/delete', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        adminMenu.getAllChoir(req, res, next);
    });
    router.get('/admin/choir/GetRole/:roleName', function(req, res, next) {
        admin.authenticationTest(req, res, next);
        choir.getRoleByName(req, res, next);
    });


// ** Choir end routes

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
        adminPage.add_news(req, res, next);
    });

    router.get('/admin/news/news_edit', function (req, res, next) {
        adminPage.form_edit_news(req, res, next);
    });

    router.post('/admin/news/news_edit', function (req, res, next) {
        adminPage.edit_news(req, res, next);
    });

    router.get('/admin/news/news_delete', function (req, res, next) {

    });

    router.post('/admin/news/news_delete', function (req, res, next) {

    });

// *** END

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
