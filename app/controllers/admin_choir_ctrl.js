const C = require('../../config/appConfig');
const ModelLocation = require('../models/location');
const ModelEffectiv = require('../models/effectif');
const ModelChoir = require('../models/choir');
const ModelGroup = require('../models/group');
const AdminChoirDb = require ('../controllers/database/admin_choir_db');
const AdminLocationDb = require('../controllers/database/admin_location_db');
const AdminEffectifDb = require('../controllers/database/admin_effectif_db');
const AdminGroupDb = require('../controllers/database/admin_group_db');


var self = module.exports = {
    choir:function (req, res, next) {
        res.render('admin/choir/choir');
    },
    admin_choir_edit : function(req, res, next){
        let Name = req.body.nameChoir;

        // Get the choir searched
        let queryChoir = AdminChoirDb.getChoirByName(Name);
        C.db.query(queryChoir, function (err, resChoir, fields){
            if (err) throw (err);
            if(resChoir.length === 0){
                res.render('admin/choir/choir_update_search', {success:false});
            }

            if(resChoir[0]!== undefined){
                console.log ('Name of Choir found: ' + resChoir[0].name)
                resChoir[0].FundationYear = resChoir[0].FundationYear.toISOString().slice(0,10);
                if(resChoir[0].Language =='Français'){
                    resChoir[0].Language=1
                }else if(resChoir[0].Language =='Deutsch'){
                    resChoir[0].Language=2

                }
                    //Get effectif
                let queryEffectif = AdminEffectifDb.getEffectifFromId(resChoir[0].EffectifId);
                C.db.query(queryEffectif, function (err, resEffectif, fields) {
                    console.log(resEffectif);
                    if(err) throw(err);
                    if(resEffectif.length === 0){

                        res.render('admin/choir/choir_result_updated', {success: false});
                    }

                    if(resEffectif){
                        console.log('effectif:' + resEffectif[0].NbMembers);
                            // location
                        let queryLocation = AdminLocationDb.getLocationFromId(resChoir[0].LocationId);
                        C.db.query(queryLocation, function (err, resLocation, fields){
                            if(err) throw(err);
                            if(resLocation.length === 0) {
                                res.render('admin/choir/choir_result_updated', {success: false});
                            }
                            if(resLocation){
                                console.log('Address:' + resLocation[0].NPA);
                                    //Groups
                                let queryGroups = AdminGroupDb.getGroupsFromId(resChoir[0].GroupsId);
                                C.db.query(queryGroups, function(err, resGroups, fields){
                                    if(err) throw (err);
                                    if(resGroups){
                                        console.log('Groups: ' + resGroups[0].Name);
                                        resGroups[0].MembershipDate = resGroups[0].MembershipDate.toISOString().slice(0,10);

                                        if(resGroups[0].DateUSC !='0000-00-00') {
                                            resGroups[0].DateUSC = resGroups[0].DateUSC.toISOString().slice(0, 10);
                                        }
                                        if(resGroups[0].DateFSCV !='0000-00-00') {
                                            resGroups[0].DateFSCV = resGroups[0].DateFSCV.toISOString().slice(0, 10);
                                        }



                                    }
                                    self.getRoleByName('President').then(function (PersonPresident) {
                                        self.getRoleByName('Director').then(function (PersonDirector) {
                                            self.getRoleByName('Secretary').then(function (PersonSecretaire) {
                                                self.getRoleByName('Cashier').then(function (PersonCaissier) {
                                                    res.render('admin/choir/choir_result',{
                                                        choirResult: resChoir,
                                                        locationResult: resLocation,
                                                        effectifResult: resEffectif,
                                                        groupsResult: resGroups,
                                                        PersonPresident:PersonPresident,
                                                        PersonDirector:PersonDirector,
                                                        PersonSecretaire:PersonSecretaire,
                                                        PersonCaissier:PersonCaissier
                                                    });
                                                })
                                            })
                                        })
                                    })

                                })
                            }
                        });
                    }
                });
            }
        });
    },
    admin_choir_result : function(req, res, next){

        //All fields i need
        let name = req.body.choeur_name;
        let membre = req.body.nbeffectif;
        let npa = req.body.npa;
        let city = req.body.city;
        let date = req.body.dateOfFundation;
        let langue = req.body.language;
        let usc = req.body.usc;//
        let fscv = req.body.fscv;//
        let mailing = req.body.mailing;
        let group = req.body.grpmts;//
        let dateGrmpts = req.body.dateGrpmts;//
        let sousGroup = req.body.sousGrpmts;//
        let type = req.body.typeChoeur;
        let church = req.body.church_leader;
        let gospel = req.body.gospel_leader;
        let choirId = req.body.idChoir;
        let locationId = req.body.idLocation;
        let effectifId = req.body.idEffectif;
        let groupsId = req.body.idGroups;//




        let homepage;
        let president;
        let director;
        let cashier ;
        let secretary;
        let comments ;


        if(req.body.homepage === ''||req.body.homepage === undefined){

            homepage = ''
        }
        else{
            homepage = req.body.homepage;
        }
        //president
        if(req.body.presidentName === undefined){

            president = ''
        }
        else{
            president = req.body.presidentName;
        }
        //director
        if(req.body.directorName === undefined){

            director = ''
        }
        else{
            director = req.body.directorName;
        }
        //cashier
        if(req.body.cashier === undefined){

            cashier = ''
        }
        else{
            cashier = req.body.cashier;
        }
        //secretary
        if(req.body.secretary === undefined){

            secretary = ''
        }
        else{
            secretary = req.body.secretary;
        }
        //comments
        if( req.body.comment === ''||req.body.comment === undefined){

            comments = ''
        }
        else{
            comments = req.body.comment;
        }


        // Transform the check box

        //Type Church
        if (church === 'on') {
            church = 1;
        }
        else {
            church = 0;
        }

        //Type Gospel
        if (gospel === 'on') {
            gospel = 1;
        }
        else {
            gospel = 0;
        }

        //Avoid mistake with date
        let dateUsc = '';
        if(req.body.dateUSC === ''){
            dateUsc = '0000-00-00';
        }
        else{
            dateUsc = req.body.dateUSC;//
        }

        let dateFscv = '';
        if(req.body.dateFSCV === ''){
            dateFscv = '0000-00-00';
        }
        else{
            dateFscv = req.body.dateFSCV;//
        }



        //Create model update for Location, Effectif, Groups and Choir

        let modelUpdateLocation = new ModelLocation({
            Address:'',
            NPA: npa,
            City: city
        });

        var modelUpdateEffectif = new ModelEffectiv({
            nbYear: date,
            nbMembre: membre

        });

        var modelUpdateGroup = new ModelGroup({
            NameGroup: group,
            Groups: sousGroup,
            FSCV :fscv,
            USC:usc,
            DateGroups : dateGrmpts,
            DateUSC:dateUsc,
            DateFSCV:dateFscv

        });


        var modelUpdateChoir = new ModelChoir({
            Name: name,
            DateFoundation: date,
            Type:type,
            Church: church,
            Gospel: gospel,
            Language: langue,
            Homepages: req.body.homepage,
            Comment: comments,
            Mailing: mailing,
            NamePresident: president,
            NameDirector: director,
            NameCashier: cashier,
            NameSecretary: secretary


        });
        console.log("Display all models update");
        console.log(modelUpdateLocation);
        console.log(modelUpdateEffectif);
        console.log(modelUpdateGroup);
        console.log(modelUpdateChoir);




        //Edit the Location
        let queryFindLocation = AdminLocationDb.getLocation(modelUpdateLocation);
        C.db.query(queryFindLocation, function (err,rowsLocation,fields){
            if(err) throw(err);
            if(rowsLocation.length === 0){
                let queryUpdateLocation = AdminLocationDb.editLocation(locationId,modelUpdateLocation);
                C.db.query(queryUpdateLocation, function (err, rowsLocation, fields){
                    if(err)throw(err);
                    if(rowsLocation.length === 0){
                        res.render('admin/choir/choir_result_updated', {success: false});
                    }
                    else{
                        console.log("Location updated");
                        modelUpdateChoir.LocationId = rowsLocation.insertId;
                        //Edit Effectif
                        let queryUpdateEffectif = AdminEffectifDb.editEffectif(effectifId,modelUpdateEffectif);
                        C.db.query(queryUpdateEffectif, function (err, rowsEffectif, fields){
                            if(err)throw(err);
                            if(rowsEffectif.length === 0){
                                res.render('admin/choir/choir_result_updated', {success: false});
                            }
                            else{
                                console.log("Effectif updated");


                                //Edit Groups

                                let queryUpdateGroups = AdminGroupDb.editGroups(groupsId,modelUpdateGroup);
                                C.db.query(queryUpdateGroups, function (err, rowsGroups, fields){
                                    if(err)throw(err);
                                    if(rowsGroups.length === 0){
                                        res.render('admin/choir/choir_result_updated', {success: false});
                                    }
                                    else{
                                        console.log("Groups updated");

                                        //Edit Choir
                                        console.log(modelUpdateChoir);
                                        let queryUpdateChoir = AdminChoirDb.editChoir(choirId,modelUpdateChoir);
                                        C.db.query(queryUpdateChoir, function (err, rowsChoir, fields){
                                            if(err)throw(err);
                                            if(rowsChoir.length === 0){
                                                res.render('admin/choir/choir_result_updated', {success: false});
                                            }
                                            else{
                                                console.log("Choirs updated");
                                                res.render('admin/choir/choir_result_updated', {success: true});

                                            }

                                        });
                                    }

                                });
                            }
                        });
                    }
                });


            }else{

                modelUpdateChoir.LocationId = rowsLocation[0].LocationId;
                //Edit Effectif
                let queryUpdateEffectif = AdminEffectifDb.editEffectif(effectifId,modelUpdateEffectif);
                C.db.query(queryUpdateEffectif, function (err, rowsEffectif, fields){
                    if(err)throw(err);
                    if(rowsEffectif.length === 0){
                        res.render('admin/choir/choir_result_updated', {success: false});
                    }
                    else{
                        console.log(queryUpdateEffectif);
                        console.log(modelUpdateGroup);
                        console.log("Effectif updated");

                        //Edit Groups
                        let queryUpdateGroups = AdminGroupDb.editGroups(groupsId,modelUpdateGroup);
                        C.db.query(queryUpdateGroups,function (err,rowsGroups, field) {
                            console.log(queryUpdateGroups);
                            if(err) throw (err);
                            if(rowsGroups.length===0){
                                res.render('admin/choir/choir_result_updated', {success: false});

                            }else{
                                console.log("Group updated");
                            }

                                //Edit Choir
                                let queryUpdateChoir = AdminChoirDb.editChoir(choirId,modelUpdateChoir);
                                C.db.query(queryUpdateChoir, function (err, rowsChoir, fields){
                                    if(err)throw(err);
                                    if(rowsChoir.length === 0){
                                        res.render('admin/choir/choir_result_updated', {success: false});
                                    }
                                    else{
                                        console.log("Choirs updated");
                                        res.render('admin/choir/choir_result_updated', {success: true});

                                    }

                                });


                        });
                    }
                });
            }
        });


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
    getMenuByName : function (id){
        return new Promise(function (resolve, reject) {

            let query = AdminChoirDb.getMenuById(id);

            C.db.query(query, function (err, rows, cols) {
                if (err) throw(err);
                rows=JSON.stringify(rows)
                rows=JSON.parse(rows)
                resolve(rows);

            });

        })

    },

    addChoir : function(req, res, next) {

        // all the fields for Choir and for the table joins at choir

        let choirname = req.body.choeur_name;
        let effectif = req.body.effectif;
        let postcode = req.body.npa;
        let town = req.body.lieu;
        let date = req.body.dateOfFundation;
        let langue = req.body.language;
        let USC = req.body.Usc;
        let FSCV = req.body.fscv;
        let grpmts = req.body.grpmts;
        let dateGrpmts = req.body.dateGrpmts;
        let decanat = req.body.sousGrpmts;
        let typeChoir = req.body.typeChoeur;
        let chChurch = req.body.church_leader;
        let chGospel = req.body.gospel_leader;
        let mail = req.body.mailing;

        // test if valeur = undefined i put a string
        let homepage;
        let presidentName;
        let directorName;
        let cashier;
        let secretaryName;
        let comments;

        //homepage
        if(req.body.homepage === undefined || req.body.homepage === ''){

            homepage = ''
        }
        else{
            homepage = req.body.homepage;
        }
        //president
        if(req.body.presidentName === undefined){

            presidentName = ''
        }
        else{
            presidentName = req.body.presidentName;
        }
        //director
        if(req.body.directorName === undefined){

            directorName = ''
        }
        else{
            directorName = req.body.directorName;
        }
        //cashier
        if(req.body.cashier === undefined){

            cashier = ''
        }
        else{
            cashier = req.body.cashier;
        }
        //secretary
        if(req.body.secretary === undefined){

            secretaryName = ''
        }
        else{
            secretaryName = req.body.secretary;
        }
        //comments
        if(req.body.comment === undefined || req.body.comment === ''){

            comments = ''
        }
        else{
            comments = req.body.comment;
        }

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

        let uscDate = '';
        if(req.body.dateUSC === ''){
            uscDate = '0000-00-00';
        }
        else{
            uscDate = req.body.dateUSC;
        }

        let fscvDate = '';
        if(req.body.dateFSCV === ''){
            fscvDate = '0000-00-00';
        }
        else{
            fscvDate = req.body.dateFSCV;
        }



        //*** Model ordre de insertion

        var modelLocation = new ModelLocation({
            Address: '',
            NPA: postcode,
            City: town
        });

        var modelEffectif = new ModelEffectiv({
            nbYear: date,
            nbMembre: effectif

        });

        var modelGroup = new ModelGroup({
            NameGroup: grpmts,
            Groups: decanat,
            FSCV :FSCV,
            USC:USC,
            DateGroups : dateGrpmts,
            DateUSC:uscDate,
            DateFSCV:fscvDate

        });


        var modelChoir = new ModelChoir({
            Name: choirname,
            DateFoundation: date,
            Type:typeChoir,
            Church: chChurch,
            Gospel: chGospel,
            Language: langue,
            Comment: comments,
            Homepages: homepage,
            Mailing: mail,
            NamePresident: presidentName,
            NameDirector: directorName,
            NameCashier: cashier,
            NameSecretary: secretaryName


        });




        let queryFindLocation =AdminLocationDb.getLocation(modelLocation);
        C.db.query(queryFindLocation, function (err, rowsLocation,fields){
            if (err) throw(err);
            if(rowsLocation.length===0){
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

                        //*** Group creation
                        let queryInsertGroup = AdminGroupDb.insertGroup(modelGroup);
                        C.db.query(queryInsertGroup, function (err,rowsGroup, fields){
                            if(err) throw(err);
                            if(rowsGroup.length === 0){
                                res.render('admin/choir/choir_added', {success:false});
                            }
                            console.log("1 row inserted");
                            modelChoir.GroupsId = rowsGroup.insertId;


                            let queryInsertChoir = AdminChoirDb.insert(modelChoir);
                            C.db.query(queryInsertChoir, function (err, rowsChoir, fields) {
                                if(err) throw (err);
                                if(rowsChoir.length === 0){
                                    res.render('admin/choir/choir_added', {success: false});
                                }
                                console.log("1 row inserted");
                                res.render('admin/choir/choir_added',{success:true});

                            })
                        })
                    })

                })
            }else {
                modelChoir.LocationId = rowsLocation[0].LocationId;
                // Effectif
                let queryInsertEffectif = AdminEffectifDb.insertNewEffectif(modelEffectif);
                C.db.query(queryInsertEffectif, function (err, rowsEffectif, fields) {
                    if (err) throw(err);
                    if (rowsEffectif.length === 0) {
                        res.render('admin/choir/choir_added', {success: false});
                    }
                    console.log("1 row inserted");
                    modelChoir.EffectifId = rowsEffectif.insertId;

                    //*** Group creation
                    let queryInsertGroup = AdminGroupDb.insertGroup(modelGroup);
                    console.log(modelChoir);
                    C.db.query(queryInsertGroup, function (err,rowsGroup, fields){
                        if(err) throw(err);
                        if(rowsGroup.length === 0){
                            res.render('admin/choir/choir_added', {success:false});
                        }
                        console.log("1 row inserted");
                        modelChoir.GroupsId = rowsGroup.insertId;


                        let queryInsertChoir = AdminChoirDb.insert(modelChoir);
                        C.db.query(queryInsertChoir, function (err, rowsChoir, fields) {
                            if(err) throw (err);
                            if(rowsChoir.length === 0){
                                res.render('admin/choir/choir_added', {success: false});
                            }
                            console.log("1 row inserted");
                            res.render('admin/choir/choir_added',{success:true});

                        })
                    })
                })
            }


        })


    },

}
