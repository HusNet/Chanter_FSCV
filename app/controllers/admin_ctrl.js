const C = require('../../config/appConfig');
const AdminLogin = require('../models/admin_login');
const AdminLoginDb = require('../controllers/database/admin_login_db');


// login page
exports.login = function(req, res, next) {

    if (req.session) {
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
                session.id = adminLogin.userId;
                session.save();

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

    res.redirect('home');
}


//affichage de la page admin
exports.index = function(req, res, next) {

    res.render('admin/dashboard', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch',

    });
};

function isAdmin(req){

}