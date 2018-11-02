//import {NULL} from "mysql";

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

// Add a personn in the DB
exports.admin_person_add = function(req, res, next) {

    // All fields for adding a person: people, location, roles
    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let phone = req.body.phoneP;
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
    let startAbo = req.body.startaboP;
    let userId = null;
    let roleId = null;

    console.log(startAbo);
    //create a table with information about the roles selected
    let arrayRoleSelected = [director, director2, president, secretary, cashier, comite, other];
    let arrayRoleNames = ['Director', 'Director_2', 'President', 'Secretary', 'Cashier', 'Committee', 'Other'];

    //Transform the check box 'on' or undefine from Newsletter to boolean
    if (newsletter === 'on'){
        newsletter = 1; // 1 --> true
    }
    else {
        newsletter = 0; // 0 --> false
    }
    if (startAbo == ''){
        //startAbo = NULL; // data was not filled, so we need a null value for the db
    }

    // Create the user with the model
    var usermodel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phone,
        PhoneProf: phoneProf,
        Email: email,
        Newsletter: newsletter,
        StartAbo: startAbo

    });

    // Create the location with the model
    var locationModel = new LocationModel({
        Address: address,
        NPA: npa,
        City: city
    })

    console.log("Display models...");
    console.log(usermodel);
    console.log(locationModel);

    // Create a new location for the user
    console.log(" trying to create a new location...");
    // Query for the insertion of the location
    let queryInsertLocation = AdminLocationDb.insertNewLocation(locationModel);
    // query the db to insert a new person
    C.db.query(queryInsertLocation, function (err, rowsLocation, fields) {
        if (err) throw(err);
        if (rowsLocation.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_added', {success: false});
        }
        console.log("1 record inserted for location... id : " + rowsLocation.insertId);
        // Get the id of the location
        usermodel.LocationId = rowsLocation.insertId;

        // Insert a new person in the db
        console.log(" trying to create a new person...");
        let queryInsertUser = AdminUserDb.insertNewPerson(usermodel);
        // query the db to insert a new person
        C.db.query(queryInsertUser, function (err, rowsU, fields) {
            if (err) throw(err);
            if (rowsU.length === 0) // if the user doesn't exist
            {
                res.render('admin/person/person_added', {success: false});
            }
            console.log("1 record inserted for user with id : " + rowsU.insertId);
            // Id of the user
            userId = rowsU.insertId;

            // Foreach Role
            // If the box was checked for the role
            // Get the id of the role selected on 'on'
            // Insert the RoleId + UserId in the table User_Role
            for (let i in arrayRoleSelected) {
                if (arrayRoleSelected[i] != undefined)
                {
                    //query get id of the role
                    let queryRoleId = AdminRoleDb.getIdRole(arrayRoleNames[i]);
                    // Query the db
                    C.db.query(queryRoleId, function (err, resRoleId, fields) {
                        if (err) throw(err);
                        if (resRoleId.length === 0) // if the user doesn't exist
                        {
                            res.render('admin/person/person_added', {success: false});
                        }
                        // If the id of the role exists
                        if (resRoleId.length) {
                            roleId = (resRoleId[0].RoleId); //Get the id of the role
                            console.log('Role Id founded : ' + roleId);

                            //insert the id of the role and the id of the user
                            //in the table user_role
                            let queryInsertUserRole = AdminRoleUserDb.insertUserRole(userId, roleId)
                            C.db.query(queryInsertUserRole, function (err, rows, fields) {
                                if (err) throw(err);
                                console.log("1 record inserted");
                            });
                        }
                    });
                }
            }
            res.render('admin/person/person_added', {success: true});
        });
    });
};


exports.admin_person_edit = function(req, res, next) {

    res.redirect('/admin/person/person_edit');

};


exports.admin_person_delete = function(req, res, next) {

    // recover data
    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let email = req.body.emailP;
    let userId = null;


    // Search the user to delete in the db with lastname, firstname and email
    let queryUser = AdminUserDb.getIdOfUserFromEmail(lastname, firstname, email);
    C.db.query(queryUser, function (err, resUser, fields) {
        if (err) throw(err);
        if (resUser.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_deleted', {success: false});
        }
        if (resUser[0] !== undefined){
            userId = (resUser[0].UserId); //Return the id user
            console.log('User Id founded : ' + userId);

            // Delete all the roles attached to this id user
            let queryDeleteUserRole = AdminRoleUserDb.deleteUserRoleFromUserId(userId);
            C.db.query(queryDeleteUserRole, function (err, resDelUserRole, fields) {
                if (err) throw(err);
                console.log ('rows user_role deleted');

                //Delete the user in the DB and the location attached
                let queryDeleteUserLocation = AdminUserDb.deletePersonAndLocation(resUser[0].LocationId);
                C.db.query(queryDeleteUserLocation, function (err, resDelUser, fields) {
                    if (err) throw(err);
                    if (resDelUser.length === 0) // if the location and user were not deleted
                    {
                        res.render('admin/person/person_deleted', {success: false});
                    }
                    console.log ('rows Location and User deleted');
                    res.render('admin/person/person_deleted', {success: true});
                });
            });
        }
    });
};

