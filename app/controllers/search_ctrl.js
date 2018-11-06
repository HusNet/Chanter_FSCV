const C = require('../../config/appConfig');
const AdminChoirDb = require('../controllers/database/admin_choir_db');
const MenuRender = require('../controllers/render_ctrl');

exports.search_form = function(req, res, next) {

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

            res.render('search/result_search', {results: rows, mainMenu: mainMenu});
        });
    });
};