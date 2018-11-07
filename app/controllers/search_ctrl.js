const C = require('../../config/appConfig');
const AdminChoirDb = require('../controllers/database/admin_choir_db');
const AdminUserDb = require('../controllers/database/admin_person_db');
const MenuRender = require('../controllers/render_ctrl');

exports.search = function(req, res, next) {
    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('search/search', {mainMenu: mainMenu});
    });
};

exports.search_form_choir = function(req, res, next) {
    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('search/search_choir', {mainMenu: mainMenu});
    });
};

exports.search_choir = function (req, res, next) {

    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu){
        let name = null;
        let fundationYear = null;
        let church = null;
        let gospel = null;
        let language = null;
        let effectif = null;
        let location = null;

        if(req.body.name !== '')
            name = req.body.name;
        if(req.body.fundationYear !== '')
            fundationYear = req.body.fundationYear;
        if(req.body.church === 'on')
            church = 1;
        else
            church = 0;
        if(req.body.gospel === 'on')
            gospel = 1;
        else
            gospel = 0;
        if(req.body.language !== '')
            language = req.body.language;
        if(req.body.effectif !== '')
            effectif = req.body.effectif;
        if(req.body.location !== '')
            location = req.body.location;

        let query = AdminChoirDb.getExportChoir(name, fundationYear, church, gospel, language, effectif, location);

        C.db.query(query, function (err, rows, fields) {
            if (err) throw(err);

            console.log(rows);

            res.render('search/result_search_choir', {results: rows, mainMenu: mainMenu});
        });
    });
};

exports.search_form_person = function(req, res, next) {

    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu) {
        res.render('search/search_person', {mainMenu: mainMenu});
    });
};

exports.search_person = function (req, res, next) {
    MenuRender.menuRender(req, res, next, function(req, res, next, mainMenu){
        let lastname = null;
        let firstname = null;
        let phone = null;
        let phoneP = null;
        let email = null;
        let startAbo = null;
        let newsletter = null;
        let location = null;

        if(req.body.lastname !== '')
            lastname = req.body.lastname;
        if(req.body.firstname !== '')
            firstname = req.body.firstname;
        if(req.body.phone !== '')
            phone = req.body.phone;
        if(req.body.phoneP !== '')
            phoneP = req.body.phoneP;
        if(req.body.email !== '')
            email = req.body.email;
        if(req.body.startAbo !== '')
            startAbo = req.body.startAbo;
        if(req.body.newsletter === 'on')
            newsletter = 1;
        else
            newsletter = 0;
        if(req.body.location !== '')
            location = req.body.location;

        let query = AdminUserDb.getExportPerson(lastname, firstname, phone, phoneP, email, startAbo, newsletter, location);

        C.db.query(query, function (err, rows, fields) {
            if (err) throw(err);

            console.log(rows);

            res.render('search/result_search_person', {results: rows, mainMenu: mainMenu});
        });
    });
};