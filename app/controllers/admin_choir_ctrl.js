const C = require('../../config/appConfig');
const ModelLocation = require('../models/location');
const ModelEffectiv = require('../models/effectif');
const ModelChoir = require('../models/choir');
const AdminChoirDb = require ('../controllers/database/admin_choir_db');
const AdminLocationDb = require('../controllers/database/admin_location_db');
const AdminEffectifDb = require('../controllers/database/admin_effectif_db');

module.exports = {
    choir:function (req, res, next) {
        res.render('admin/choir/choir');
    },
    getRoleByName : function (role){
        return new Promise(function (resolve, reject) {

            let query = AdminChoirDb.getRoleByName(role);

            C.db.query(query, function (err, rows, cols) {
                if (err) throw(err);
                rows=JSON.stringify(rows)
                rows=JSON.parse(rows)
                resolve(rows);

            });

        })

    },
    getAllChoirDelete : function(req,res, next){
        C.db.query(AdminChoirDb.getAllChoir(),function(err, rows, fields){
            if (err) throw(err);
            res.render('admin/choir/choir_delete', {choirs:rows});
        });
    },
    deleteChoir : function(req, res, next){
        C.db.query(AdminChoirDb.delete(req.query.id),function (err, rows,fields){
            if (err) throw (err);
            res.redirect('/admin/choir/delete')

        });
    },
    addChoir : function(req, res, next) {

        // all the fields for Choir and for the table joins at choir

        let choirname = req.body.choeur_name;
        let effectiv = req.body.effectif;
        let postcode = req.body.npa;
        let town = req.body.lieu;
        let date = req.body.dateOfFundation;
        let homepage = req.body.homepage;
        let langue = req.body.language;
        let USC = req.body.Usc; //listbox
        let dateUsc = req.body.dateUSC;
        let FSCV = req.body.fscv; //listbox
        let dateFscv = req.body.dateFSCV;
        let grpmts = req.body.grpmts; //listbox
        let dateGrpmts = req.body.dateGrpmts;
        let decanat = req.body.decanat; //listbox
        let typeChoir = req.body.typeChoeur; //listbox
        let chChurch = req.body.church_leader; //checkbox
        let chGospel = req.body.gospel_leader; //checkbox
        let presidentName = req.body.presidentName;
        let directorName = req.body.directorName;
        let cashierName = req.body.cashier;
        let secretaryName = req.body.secretary;
        let comments = req.body.comment;
        let mail = req.body.mailing;



        //Type Church
        if (chChurch === 'on') {
            chChurch = 1;
        }
        else {
            chChurch = 0;
        }

        //Type Gospel
        if (chGospel === 'on') {
            chGospel = 1;
        }
        else {
            chGospel = 0;
        }



        //*** Model ordre de insertion

        let modelLocation = new ModelLocation({
            Address: 'sans addresse',
            NPA: postcode,
            City: town
        });

        var modelEffectif = new ModelEffectiv({
            nbYear: date,
            nbMembre: effectiv

        });

        console.log(modelEffectif);
        //Creation of a model for a choir (field in Choir table)
        var modelChoir = new ModelChoir({
            Name: choirname,
            DateFoundation: date,
            Church: chChurch,
            Gospel: chGospel,
            Language: langue,
            Comments: comments,
            Homepage: homepage,
            Mailing: mail,
            NamePresident: presidentName,
            NameDirector: directorName,
            NameCashier: cashierName,
            NameSecretary: secretaryName


        });



        let queryInsertLocation = AdminLocationDb.insertNewLocation(modelLocation);
        C.db.query(queryInsertLocation, function (err, rowsLocation, fields) {
            if (err) throw(err);
            if (rowsLocation.length === 0) {
                res.render('admin/choir/choir_added', {success: false});
            }
            console.log("1 row inserted");
            modelChoir.LocationId = rowsLocation.insertId;

            // Effectif
            let queryInsertEffectif = AdminEffectifDb.insertNewEffectif(modelEffectif);
            C.db.query(queryInsertEffectif, function (err, rowsEffectif, fields) {
                if (err) throw(err);
                if (rowsEffectif.length === 0) {
                    res.render('admin/choir/choir_added', {success: false});
                }
                console.log("1 row inserted");
                modelChoir.EffectifId = rowsEffectif.insertId;
                console.log(modelChoir);
                //Choir
                let queryInsertChoir = AdminChoirDb.insert(modelChoir);
                C.db.query(queryInsertChoir, function (err, rowsChoir, fields) {
                    if (err) throw(err);
                    if (rowsChoir.length === 0) {
                        res.render('admin/choir/choir_added', {success: false});
                    }
                    console.log("1 row inserted");
                    res.render('admin/choir/choir_added', {success: true});
                })

            })

        })


    },


}
