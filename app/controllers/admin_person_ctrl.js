const C = require('../../config/appConfig');
const UserModel = require('../models/user');
const LocationModel = require('../models/location');
const AdminUserDb = require('../controllers/database/admin_person_db');
const AdminChoirDb = require('../controllers/database/admin_choir_db');
const AdminRoleDb = require('../controllers/database/admin_role_db');
const AdminRoleUserDb = require('../controllers/database/admin_user_role_db');
const AdminUserChoirDb = require('../controllers/database/admin_user_choir_db');
const AdminLocationDb = require('../controllers/database/admin_location_db');

// Request the persone page with the tree butons add/modify/delete
exports.person = function(req, res, next) {
    res.render('admin/person/person', {
        title: 'page : personnes',
    });
};

exports.admin_findPersonLinkChoir = function(req, res, next) {

    // store the data to search the user
    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let email = req.body.emailP;

    //Search the user in the DB with lastname, firstname an email
    let queryUser = AdminUserDb.getUser(lastname, firstname, email);
    C.db.query(queryUser, function (err, resUser, fields) {
        if (err) throw(err);
        if (resUser.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_searched', {success: false});
        }
        else  { // if the user exist
            let queryAllChoir = AdminChoirDb.getAllChoir();
            C.db.query(queryAllChoir, function (err, resChoir, fields) {
                if (err) throw(err);
                res.render('admin/person/person_link_to_choir', {userLink: resUser, choirList: resChoir});
            });
        }
    });

};

exports.admin_personLinkChoir= function(req, res, next) {

    let choirId = req.body.choirId;
    let userId = req.body.idUser;
    console.log("Link : Choir id " + choirId + ", user id " + userId);

    let queryLink = AdminUserChoirDb.insertUserChoir(userId, choirId);
    C.db.query(queryLink, function (err, resUserChoir, fields) {
        if (err) throw(err);
        if (resUserChoir.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_choir_linked', {success: false});

        }
        else {
            console.log("bbbb");
            res.render('admin/person/person_choir_linked', {success: true});
        }

    });

};

    /*
    exports.admin_person_search = function(req, res, next) {

        let lastname = req.body.lastnameP;
        let firstname = req.body.firstnameP;

        let queryUser = AdminUserDb.getUserWithoutMail(lastname, firstname);
        C.db.query(queryUser, function (err, resListUser, fields) {
            if (err) throw(err);
            if (resUser.length === 0) // if the user doesn't exist
            {
                res.render('admin/person/person_searched', {success: false});
            }
            else {
                res.render('admin/person/person_searched_list', {listUserFounded: resListUser});
            }
        });

    };
    */


exports.admin_person_edit = function(req, res, next) {

    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let email = req.body.emailP;

    let arrayResRole = {Director : 'undefined', Director_2: 'undefined', President: 'undefined', Secretary: 'undefined', Cashier: 'undefined', Committee: 'undefined', Other: 'undefined'};
    let arrayRoleNames = ['Director', 'Director_2', 'President', 'Secretary', 'Cashier', 'Committee', 'Other'];

    // Get the user searched in the db
    let queryUser = AdminUserDb.getUser(lastname, firstname, email);
    C.db.query(queryUser, function (err, resUser, fields) {
        if (err) throw(err);
        if (resUser.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_searched', {success: false});
        }
        if (resUser[0] !== undefined) {
            console.log('Name of User founded: ' + resUser[0].Lastname);

            //If there is a date for the abo
            if (resUser[0].StartAbo !== null){
                // Set the format of the date
                resUser[0].StartAbo =  resUser[0].StartAbo.toISOString().slice(0, 10);
            }


            // Get all information about the location of the user
            let queryLocation = AdminLocationDb.getLocationFromId(resUser[0].LocationId);
            C.db.query(queryLocation, function (err, resLocation, fields) {
                if (err) throw(err);
                if (resLocation.length === 0) // if the Location doesn't exist
                {
                    res.render('admin/person/person_edited', {success: false});
                }
                if (resLocation){
                    console.log('Address of Location founded ' + resLocation[0].Address);

                    //Find all the id roles of the user
                    let queryUserRole = AdminRoleUserDb.userRoleFromUserId(resUser[0].UserId);
                    C.db.query(queryUserRole, function (err, resUserRole, fields) {
                        if (err) throw(err);
                        // ! It is possible to have no result for User_role
                        if (resUserRole.length === 0)
                        {
                            // If no roles, redirect to the edit result page
                            console.log("This user has no roles");
                            res.render('admin/person/person_edit_result', {userResult: resUser, locationResult: resLocation, roleResult: arrayResRole});
                        }
                        else  {
                            // if roles founded, return the list of the roles
                            // Display wich id are founded
                            for (let i = 0 ; i<resUserRole.length; i ++){
                                console.log("Role Id found for user : " + resUserRole[i].RoleId)
                            }

                            // Search all the names of the id
                            let queryRole = AdminRoleDb.getNameR(resUserRole);
                            C.db.query(queryRole, function (err, resNameRole, fields) {
                                if (err) throw(err);

                                // Display the names of the roles for the users.
                                for (let i = 0 ; i<resNameRole.length; i ++){
                                    console.log(resNameRole[i].Name);
                                }

                                // Compare what we founded in the ResNameRole to the available roles and
                                // Sets the status of'on' when the role belongs to the user in the arrayResRole
                                for (let j = 0 ; j < arrayRoleNames.length ; j ++){
                                    for (let k = 0 ; k < resNameRole.length ; k ++) {
                                        if (arrayRoleNames[j] === resNameRole[k].Name) {
                                            arrayResRole[resNameRole[k].Name] = 'on';
                                        }
                                    }
                                }

                                // Display the result for the roles
                                console.log("Array of resRole  : Director " + arrayResRole.Director +
                                    " Director 2 : " + arrayResRole.Director_2 +
                                    " President : " + arrayResRole.President +
                                    " Secretary : " + arrayResRole.Secretary +
                                    " Cashier : " + arrayResRole.Cashier +
                                    " Committee : " + arrayResRole.Committee +
                                    " Other : " + arrayResRole.Other
                                );

                                // Redirect to the result page to display all informations !
                                res.render('admin/person/person_edit_result', {userResult: resUser, locationResult: resLocation, roleResult: arrayResRole});

                            });
                        }
                    });
                }
            });
        }
    });
};


exports.admin_person_edit_result = function(req, res, next){

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
    let committee = req.body.comiteP;
    let other = req.body.autreP;
    let startAbo = req.body.startAboP;
    let idUserToEdit = req.body.idUser;
    let idLocationToEdit = req.body.idLocation;

    let arrayRoleSelected = [director, director2, president, secretary, cashier, committee, other];
    let arrayRoleNames = ['Director', 'Director_2', 'President', 'Secretary', 'Cashier', 'Committee', 'Other'];
    let arrayRolesForUser;

    console.log("Id of the user need to be updated : " + idUserToEdit);

    //Transform the check box 'on' or undefine from Newsletter to boolean
    if (newsletter === 'on'){
        newsletter = 1; // 1 --> true
    }
    else {
        newsletter = 0; // 0 --> false
    }
    // Create the update user with the model
    let editUserModel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phone,
        PhoneProf: phoneProf,
        Email: email,
        Newsletter: newsletter,
        StartAbo: startAbo

    });

    // Create the update location with the model
    let editLocationModel = new LocationModel({
        Address: address,
        NPA: npa,
        City: city
    });

    console.log("Display updated models...");
    console.log(editUserModel);
    console.log(editLocationModel);
    console.log("Id of the user : " + idUserToEdit);
    console.log("Id of the Location : " + idLocationToEdit);

    // Edit the location of the user
    console.log(" trying to edit the user ...");
    // Query for the edit the user
    let queryEditUser = AdminUserDb.editPerson(idUserToEdit, editUserModel);
    C.db.query(queryEditUser, function (err, rowsUserEdit, fields) {
        if (err) throw(err);
        if (rowsUserEdit.length === 0) // if the user is not edited
        {
            res.render('admin/person/person_edited', {success: false});
        }
        else {
            console.log("User successfully edited ");

            //Edit the location
            console.log("Edit the location");
            let queryEditLocation = AdminLocationDb.editLocation(idLocationToEdit, editLocationModel);
            C.db.query(queryEditLocation, function (err, rowsEditLocation, fields) {
                if (err) throw(err);
                if (rowsEditLocation.length === 0) // if the user is not edited
                {
                    res.render('admin/person/person_edited', {success: false});
                }
                else {
                    console.log("Location successfully edited ");

                    // Delete all the user_role
                    let queryDelUserRole = AdminRoleUserDb.deleteUserRoleFromUserId(idUserToEdit);
                    C.db.query(queryDelUserRole, function (err, rowsDelUserRole, fields) {
                        if (err) throw(err);
                        if (rowsDelUserRole.length === 0) // if the user is not edited
                        {
                            res.render('admin/person/person_edited', {success: false});
                        }
                        else {

                            // Store the names of roles for the user
                            arrayRolesForUser = [];
                            //cpt for the arrayRolesForUser
                            let cpt = 0;
                            // Find the id of the names
                            for (let i = 0; i<arrayRoleSelected.length; i ++)
                            {
                                if (arrayRoleSelected[i] === 'on'){
                                    arrayRolesForUser[cpt] = arrayRoleNames[i];
                                    cpt ++;
                                }
                            }

                            // All names roles founded
                            console.log("Names of edited roles for the user : " + arrayRolesForUser);

                            if (cpt === 0){
                                console.log("compteur : " + cpt);
                                // If no roles for this user, edit successfull
                                res.render('admin/person/person_edited', {success: true});
                            }
                            else {
                                //Find the id of the Roles
                                let queryRoleId = AdminRoleDb.getIdRoleFromNameRoleList(arrayRolesForUser);
                                C.db.query(queryRoleId, function (err, rowsResultIdRoles, fields) {
                                    if (err) throw(err);
                                    if (rowsResultIdRoles.length === 0) // no id found
                                    {
                                        res.render('admin/person/person_edited', {success: false});
                                    }
                                    else {
                                        // Add in the user_role table
                                        console.log("Add all roles in the user_roles table" + rowsResultIdRoles);

                                        // For each roles founded, insert it in user_role to link it with the user
                                        for (let k = 0 ; k < rowsResultIdRoles.length ; k ++){
                                            let queryAddRolesUserRoles = AdminRoleUserDb.insertUserRole(idUserToEdit, rowsResultIdRoles[k].RoleId);
                                            C.db.query(queryAddRolesUserRoles, function (err, rows1, fields) {
                                                if (err) throw(err);
                                                if (rows1.length === 0) // no insertion
                                                {
                                                    res.render('admin/person/person_edited', {success: false});
                                                }
                                            });
                                        }
                                        res.render('admin/person/person_edited', {success: true});
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
};

// Delete a person in the DB
exports.admin_person_delete = function(req, res, next) {

    // recover data
    let lastname = req.body.lastnameP;
    let firstname = req.body.firstnameP;
    let email = req.body.emailP;
    let userId = null;

    // Search the user to delete in the db with lastname, firstname and email
    let queryUser = AdminUserDb.getUser(lastname, firstname, email);
    C.db.query(queryUser, function (err, resUser, fields) {
        if (err) throw(err);
        if (resUser.length === 0) // if the user doesn't exist
        {
            res.render('admin/person/person_searched', {success: false});
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

    // Create the user with the model
    let usermodel = new UserModel({
        Lastname: lastname,
        Firstname: firstname,
        Phone: phone,
        PhoneProf: phoneProf,
        Email: email,
        Newsletter: newsletter,
        StartAbo: startAbo

    });

    // Create the location with the model
    let locationModel = new LocationModel({
        Address: address,
        NPA: npa,
        City: city
    });

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
        if (rowsLocation.length === 0) // if the user is not inserted or the user doesn't exist
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
                if (arrayRoleSelected[i] !== undefined)
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
                        else  {
                            roleId = (resRoleId[0].RoleId); //Get the id of the role
                            console.log('Role Id founded : ' + roleId);

                            //insert the id of the role and the id of the user
                            //in the table user_role
                            let queryInsertUserRole = AdminRoleUserDb.insertUserRole(userId, roleId);
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
