const C = require('../../config/appConfig');
const UserModel = require('../models/user');
const AdminUserDb = require('../controllers/database/admin_person_db');
const AdminRoleDb = require('../controllers/database/admin_role_db');
const AdminRoleUserDb = require('../controllers/database/admin_user_role_db');
const RoleModel = require('../models/role');
const UserRoleModel = require('../models/user_role');

exports.person = function(req, res, next) {
    res.render('admin/person/person', {
        title: 'page : personnes',
    });
};

exports.admin_person_add = function(req, res, next) {

    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let phonePrivate = req.body.phonePrivateP;
    let phoneProf = req.body.phoneProfP;
    let email = req.body.emailP;
    let director = req.body.directorP;
    let director2 = req.body.director2P;
    let president = req.body.presidentP;
    let secretary = req.body.secretaryP;
    let cashier = req.body.cashierP;
    let comite = req.body.comiteP;
    let other = req.body.autreP;
    let startAbo = req.body.startaboP;
    let userId = null;
    let roleId = null;

    //let startAbo = req.body.startAboP;

    //create a table with information about the roles selected
    let arrayRoleSelected = [director, director2, president, secretary, cashier, comite, other];
    let arrayRoleNames = ['Director', 'Director_2', 'President', 'Secretary', 'Cashier', 'Comite', 'Other'];

    console.log(arrayRoleSelected);

    var usermodel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phonePrivate,
        PhoneProf: phoneProf,
        Email: email,
        StartAbo: startAbo

    });

    console.log(" trying to create a new person...");

    console.log(usermodel);

    // get the query
    let queryInsertUser = AdminUserDb.insertNewPerson(usermodel);

    // query the db to insert a new person
    C.db.query(queryInsertUser, function (err, rows, fields) {
        if (err) throw(err);
        console.log("1 record inserted");

        console.log(" trying to get the id of the user...");
        //Get the id of the user inserted just before
        let queryIdUser = AdminUserDb.getIdOfUserFromEmail(lastname, firstname, email);
        C.db.query(queryIdUser, function (err, resUserId, fields) {
            if (err) throw(err);
            if (resUserId[0] !== `undefined`)
                userId = (resUserId[0].UserId);
            console.log('User Id founded : ' + userId);
            console.log(resUserId);


            console.log(" If 'on' get the id of the role and insert the userid and the role id in table user_role.... ");
            //Get all the id of the role selected
            //If the box was checked, insert the id founded of the role with the id user
            for (let i in arrayRoleSelected) {
                if (arrayRoleSelected[i] != undefined)
                {
                    console.log(arrayRoleSelected[i]);
                    console.log(arrayRoleNames[i]);

                    //query get id role from the name
                    let queryRoleId = AdminRoleDb.getIdRole(arrayRoleNames[i]);
                    C.db.query(queryRoleId, function (err, resRoleId, fields) {
                        if (err) throw(err);
                        if (resRoleId[0] !== `undefined`)
                            roleId = (resRoleId[0].RoleId);
                        console.log('Role Id founded : ' + roleId);
                        console.log(resRoleId);

                        //insert the id of the role and the id of the user
                        //in the table user_role
                        let queryInsertUserRole = AdminRoleUserDb.insertUserRole(userId, roleId)
                        C.db.query(queryInsertUserRole, function (err, rows, fields) {
                            if (err) throw(err);
                            console.log("1 record inserted");

                        });

                    });


                }
            }

        });



    });





    res.redirect('/admin/person/person_add');

};


exports.admin_person_delete = function(req, res, next) {

    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let personDeleted = null;
/*
    let queryDelete = AdminUserDb.deletePerson(lastname, firstname);

    // querying db
    C.db.query(queryDelete, function (err, rows, fields) {
        if (err) throw(err);

        // populate with db output
        if (rows[0] !== `undefined`)
            personDeleted = new UserModel(rows[0]);
            res.render('admin/person/person_delete', {

            });

        if(personDeleted === 'undefined'){

            res.render('admin/error', {
                title: 'No results ',
                errorMessage:  'This user does not exist'
            });

            console.log("User not exist");
        }
        else {
            res.render('admin/error', {
                title: 'Error while researching a user',
                errorMessage:  'No result'
            });


        };
    });

    */
};


