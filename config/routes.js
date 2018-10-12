module.exports = function(app, router) {

    app.use(router);
    app.use(function(req, res){
        res.status(404).render('404', {
            title: 'Page not found (AKA 404 Error)'
        });
    });

    //home routes
    let home = require('../app/controllers/home_ctrl');
    router.get('/', function(req, res, next) {
        home.index(req, res, next);
    });


    //contact routes
    let contact = require('../app/controllers/contact_ctrl');
    router.get('/contact', function(req, res, next) {
        contact.contact(req, res, next);
    });

    //admin login
    let admin = require('../app/controllers/admin_ctrl');
    router.get('/admin', function(req, res, next) {
        admin.login(req, res, next);
    });

    router.post('/admin', function(req, res, next) {
        admin.login_do(req, res, next);
    });

    router.get('/admin/index', function(req, res, next) {
        admin.index(req, res, next);
    });

    router.get('/admin/menu', function(req, res, next) {
        admin.menu(req, res, next);
    });

    router.get('/admin/page', function(req, res, next) {
        admin.page(req, res, next);
    });

    router.get('/admin/choir', function(req, res, next) {
        admin.choir(req, res, next);
    });

    router.get('/admin/person', function(req, res, next) {
        admin.person(req, res, next);
    });

    router.get('/admin/news', function(req, res, next) {
        admin.news(req, res, next);
    });

    router.get('/admin/service', function(req, res, next) {
        admin.service(req, res, next);
    });

    router.get('/admin/user', function(req, res, next) {
        admin.user(req, res, next);
    });

    router.get('/admin/export', function(req, res, next) {
        admin.export(req, res, next);
    });

};
