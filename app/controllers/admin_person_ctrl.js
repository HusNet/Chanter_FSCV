const C = require('../../config/appConfig');
const UserModel = require('../models/user');
const AdminUserDb = require('../controllers/database/admin_person_db');
const AdminRoleDb = require('../controllers/database/admin_role_db');
const AdminRoleUserDb = require('../controllers/database/admin_user_role_db');

exports.person = function(req, res, next) {
    res.render('admin/person/person', {
        title: 'page : personnes',
    });
};


exports.admin_person_insert = function(req, res, next) {

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
        //StartAbo: new Date()

    });

    console.log(" trying to create a new person...");

    console.log(usermodel);


    // get the query
    let queryInsertUser = AdminUserDb.insertNewPerson(usermodel);

    // query the db to insert a new person
    C.db.query(queryInsertUser, function (err, rows, fields) {
        if (err) throw(err);
        console.log("1 record inserted");

    });

    console.log(" trying to get the id of the user...");

    //Get the id of the user inserted just before
    let queryIdUser = AdminUserDb.getIdOfUserFromEmail(email);

    C.db.query(queryIdUser, function (err, rows, fields) {
        if (err) throw(err);
        userId = rows[0];
        console.log('User Id founded : ' + userId);


    });

    console.log(" If 'on' get the id of the role and insert the userid and the role id in table user_role.... ");
    //Get the id of the role selected
    //If the box was checked, insert the id founded of the role with the id user
    for (let i = 0; i < arrayRoleSelected; iter++) {
        if (arrayRoleSelected[i] != undefined)
        {
            console.log('test');
            //query get id role
            let queryIdRole = AdminRoleDb.getIdRole(arrayRoleNames[i]);
            C.db.query(queryIdRole, function (err, rows, fields) {
                if (err) throw(err);
                roleId = rows[0];
                console.log('Id Role founded : ' + roleId);

            });

            //query insert
            let queryInsertUserRole = AdminRoleUserDb.insertUserRole(userId, roleId)
            C.db.query(queryInsertUserRole, function (err, rows, fields) {
                if (err) throw(err);
                console.log("1 record inserted");

            });
        }
    }

    res.redirect('/admin/person');

};


