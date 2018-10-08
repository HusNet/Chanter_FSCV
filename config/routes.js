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

    //login routes
    let login = require('../app/controllers/login_ctrl');
    router.get('/login', function(req, res, next) {
        login.login(req, res, next);
    });
    router.post('/login', function(req, res, next) {
        login.login_do(req, res, next);
    });

    //contact routes
    let contact = require('../app/controllers/contact_ctrl');
    router.get('/contact', function(req, res, next) {
        contact.contact(req, res, next);
    });

    //admin routes
    let admin = require('../app/controllers/admin_ctrl');
    router.get('/admin', function(req, res, next) {
        admin.index(req, res, next);
    });

};
