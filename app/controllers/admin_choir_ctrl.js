const C = require('../../config/appConfig');
const AdminChoirDb = require ('../controllers/database/admin_choir_db');

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
    }
    /*add_choir : function (req,res,next){
        let dataToInsert = {}
        dataToInsert.choeurname = req.body.choeur_name;
        dataToInsert.effectiv = req.body.effectif;
        dataToInsert.postcode = req.body.effectif;
        dataToInsert.town = req.body.npa;
        dataToInsert.fondationDate = req.body.foundationDate;
        dataToInsert.homepage = req.body.homepage;
        dataToInsert.fr = req.body.fr;
        dataToInsert.all = req.body.de;
        dataToInsert.memberUsc = req.body.USC;
        dataToInsert.memberNoUsc = req.body.noUSC;
        dataToInsert.dateUsc = req.body.dateUSC;
        dataToInsert.memberFscv = req.body.fscv;
        dataToInsert.memberNoFscv = req.body.noFSCV;
        dataToInsert.dateFscv = req.body.dateFSCV;
        dataToInsert.president = req.body.president;
        dataToInsert.director = req.body.director;
        dataToInsert.grpmts = req.body.grpmts;
        dataToInsert.dateGrpmts = req.body.dateGrpmts;
        dataToInsert.decanat = req.body.decanat;
        dataToInsert.typeChoir = req.body.typeChoeur;
        dataToInsert.chChurch = req.body.church_leader;
        dataToInsert.chGospel = req.body.gospel_leader;
        dataToInsert.presidentName = req.body.presidentName;
        dataToInsert.directorName = req.body.directorName;
        dataToInsert.cashierName = req.body.cashier;
        dataToInsert.secretaryName = req.body.secretary;
        dataToInsert.comments = req.body.comment;


    }*/


}
