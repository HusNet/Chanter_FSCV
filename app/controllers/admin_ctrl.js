
// connexion méthode
const C = require('../../config/appConfig');

exports.login = function(req, res, next) {

    res.render('admin/login', {
        title: 'Connexion to the FSCV administration panel',
        body: 'Please enter your information :'
    });

};

exports.login_do = function(req, res, next) {

    let id = req.body.id;
    let pwd = req.body.pwd;
    let session = req.session;

    console.log(id + " is trying to connect");

    // check if phone number exists in database
    // TODO : Request DB

    // TODO : get clients infos from db when db query done
    /*
        C.db.connect(function(err){
            if (err) throw err;

            console.log("Connected!");

            let sql = "SELECT * FROM Users";

            C.db.query(sql, function (err, result) {
                if (err) throw err;

                console.log("Result: " + result);
    */

    let client = {
        _id: 1234,
        name: 'Michel',
        pwd: 4321,
    };

    if(client._id != id){

        res.render('admin/error', {

            title: 'Error while connecting',
            errorMessage:  'User unknown'
        });

        console.log("User unknown");
    }
    else if (client.pwd == pwd){
        session.clientId = client._id;
        session.save();
        console.log(client);
        console.log(session.clientId);

        // TODO : save client and check errors

        console.log('Client connected ...');

        res.redirect('admin/index');

    }
    else {
        res.render('admin/error', {

            title: 'Error while connecting',
            errorMessage:  'Wrong password'
        });

        console.log("Password wrong for user " + id);
    }

    /*});

});*/
};

//affichage de la page admin
exports.index = function(req, res, next) {

    res.render('admin/index', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch'
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