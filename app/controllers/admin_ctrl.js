const C = require('../../config/appConfig');
const AdminLogin = require('../models/admin_login');
const AdminLoginDb = require('../controllers/database/admin_login_db');


// login page
exports.login = function(req, res, next) {

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
    console.log("Connecting to DB");
    C.db.connect(function(err) {
        if (err) throw err;

        // get the query
        let query = AdminLoginDb.getByUsername(username);

        // querying db
        console.log("Querying DB");
        C.db.query(query, function (err, rows, fields) {
            if (err) throw(err);

            // populate with db output
            if (rows[0] !== `undefined`)
                adminLogin = new AdminLogin(rows[0]);

            console.log("User password : " + adminLogin.Password);

            if(adminLogin === 'undefined'){

                res.render('admin/error', {

                    title: 'Error while connecting',
                    errorMessage:  'User unknown'
                });

                console.log("User unknown");
            }
            else if (adminLogin.Password == pwd){
                session.userId = adminLogin.userId;
                session.save();
                console.log(session.userId);

                // TODO : save client and check errors

                console.log('Client ' + session.userId + ' connected ...');

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

//affichage de la page admin
exports.index = function(req, res, next) {

    res.render('admin/dashboard', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch',

    });
};