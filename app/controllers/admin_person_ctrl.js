const C = require('../../config/appConfig');
const UserModel = require('../models/user');
const LocationModel = require('../models/location');
const AdminUserDb = require('../controllers/database/admin_person_db');
const AdminRoleDb = require('../controllers/database/admin_role_db');
const AdminRoleUserDb = require('../controllers/database/admin_user_role_db');
const AdminLocationDb = require('../controllers/database/admin_location_db');


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
    let newsletter = req.body.newsLetterP;
    let address = req.body.addressP;
    let npa = req.body.npaP;
    let city = req.body.cityP;
    let director = req.body.directorP;
    let director2 = req.body.director2P;
    let president = req.body.presidentP;
    let secretary = req.body.secretaryP;
    let cashier = req.body.cashierP;
    let comite = req.body.comiteP;
    let other = req.body.autreP;
    //let startAbo = req.body.startaboP;
    let userId = null;
    let roleId = null;

    //create a table with information about the roles selected
    let arrayRoleSelected = [director, director2, president, secretary, cashier, comite, other];
    let arrayRoleNames = ['Director', 'Director_2', 'President', 'Secretary', 'Cashier', 'Comite', 'Other'];

    //Transform the check box 'on' or undefine from Newsletter to boolean
    if (newsletter === 'on'){
        newsletter = 1; // 1 --> true
    }
    else {
        newsletter = 0; // 0 --> false
    }


    var usermodel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phonePrivate,
        PhoneProf: phoneProf,
        Email: email,
        Newsletter: newsletter
        //StartAbo: startAbo

    });

    var locationModel = new LocationModel({
        Address: address,
        NPA: npa,
        City: city
    })

    console.log("Display models...");
    console.log(usermodel);
    console.log(locationModel);

    console.log(" trying to create a new location...");
    let queryInsertLocation = AdminLocationDb.insertNewLocation(locationModel);
    // query the db to insert a new person
    C.db.query(queryInsertLocation, function (err, rowsLocation, fields) {
        if (err) throw(err);
        console.log("1 record inserted for location... id : " + rowsLocation.insertId);
        usermodel.LocationId = rowsLocation.insertId;

        console.log(" trying to create a new person...");
        // Insert a new person in the db
        let queryInsertUser = AdminUserDb.insertNewPerson(usermodel);
        // query the db to insert a new person
        C.db.query(queryInsertUser, function (err, rowsU, fields) {
            if (err) throw(err);
            console.log("1 record inserted for user with id : " + rowsU.insertId);
            userId = rowsU.insertId;

            console.log(" If 'on' get the id of the role and insert the userid and the role id in table user_role.... ");
            // If the box was checked for the role
            // Insert the id of the role with the id of theuser
            for (let i in arrayRoleSelected) {
                if (arrayRoleSelected[i] != undefined)
                {
                    //query get id of the role
                    let queryRoleId = AdminRoleDb.getIdRole(arrayRoleNames[i]);
                    C.db.query(queryRoleId, function (err, resRoleId, fields) {
                        if (err) throw(err);
                        if (resRoleId[0] !== `undefined`)
                            roleId = (resRoleId[0].RoleId); //Get the id of the role
                        console.log('Role Id founded : ' + roleId);

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


exports.admin_person_edit = function(req, res, next) {

    res.redirect('/admin/person/person_edit');

};


exports.admin_person_delete = function(req, res, next) {

    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let userId = null;

    // Search for the Id of the user to delete
    let queryIdUser = AdminUserDb.getIdOfUser(lastname, firstname);
    C.db.query(queryIdUser, function (err, resUserId, fields) {
        if (err) throw(err);
        console.log('result of user id' + resUserId[0]);
        if (resUserId[0] !== undefined){
            userId = (resUserId[0].UserId); //Return the id user
            console.log('User Id founded : ' + userId);
        }

        // Delete all the roles attached to this user
        let queryDeleteUserrole = AdminRoleUserDb.deleteUserRoleFromUserId(userId);
        C.db.query(queryDeleteUserrole, function (err, resDelUserRole, fields) {
            if (err) throw(err);
            console.log ('rows deleted');

            //Delete the user in the DB
            let queryDeleteUser = AdminUserDb.deletePerson(lastname, firstname);
            C.db.query(queryDeleteUser, function (err, resDelUserRole, fields) {
                if (err) throw(err);
                console.log ('rows deleted');
            });
        });
    });

    res.redirect('/admin/person/person_delete');

};

