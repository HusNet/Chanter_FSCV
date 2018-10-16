const C = require('../../config/appConfig');
const AdminLogin = require('../models/admin_login');
const AdminLoginDb = require('../controllers/database/admin_login_db');


// login page
exports.login = function(req, res, next) {

    if (req.session.authenticated === false) {
        res.redirect('admin/dashboard');
    }

    res.render('admin/login', {
        title: 'Connexion to the FSCV administration panel',
        body: 'Please enter your information :'
    });

};

// login attempt
exports.login_do = function(req, res, next) {


    let username = req.body.username;
    let pwd = req.body.pwd;
    let session = req.session;
    let adminLogin = null;

    console.log(username + " is trying to connect");

    // DB connection
    C.db.connect(function(err) {
        if (err) throw err;

        // get the query
        let query = AdminLoginDb.getByUsername(username);

        // querying db
        C.db.query(query, function (err, rows, fields) {
            if (err) throw(err);

            // populate with db output
            if (rows[0] !== `undefined`)
                adminLogin = new AdminLogin(rows[0]);

            if(adminLogin === 'undefined'){

                res.render('admin/error', {

                    title: 'Error while connecting',
                    errorMessage:  'User unknown'
                });

                console.log("User unknown");
            }
            else if (adminLogin.Password == pwd){
                req.session.id = adminLogin.userId;
                req.session.authenticated = true;
                req.session.save();

                console.log('Client ' + session.id + ' connected ...');

                res.redirect('admin/dashboard');

            }
            else {
                res.render('admin/error', {
                    title: 'Error while connecting',
                    errorMessage:  'Wrong password'
                });

                console.log("Password wrong for user " + adminLogin.Username);
            }
        });
    });
};

// logout
exports.logout_do = function(req, res, next) {

    req.session.destroy();

    res.redirect('/');
};


//affichage de la page admin
exports.dashboard = function(req, res, next) {

    res.render('admin/dashboard', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch',
    });

};

exports.menu = function (req, res, next) {

    res.render('admin/menu', {
        title: 'Add/Edit/Remove Menu'
    });

};

exports.page = function(req, res, next) {

    res.render('admin/page', {
        title: 'page : page',

    });
};

exports.choir = function(req, res, next) {

    res.render('admin/choir', {
        title: 'page choeur',

    });
};

exports.person = function(req, res, next) {

    res.render('admin/person', {
        title: 'page : personnes',

    });
};

exports.news = function(req, res, next) {

    res.render('admin/news', {
        title: 'page : news',

    });
};

exports.service = function(req, res, next) {

    res.render('admin/service', {
        title: 'page : services',

    });
};

exports.user = function(req, res, next) {

    res.render('admin/user', {
        title: 'page : user',

    });
};

exports.export = function(req, res, next) {

    res.render('admin/export', {
        title: 'page : export',
    });
};

function isAdmin(req){

}