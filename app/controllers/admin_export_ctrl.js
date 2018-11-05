const C = require('../../config/appConfig');
const AdminExportDb = require('../controllers/database/admin_export_db');
const AdminChoirDb = require('../controllers/database/admin_choir_db');
const AdminUserDb = require('../controllers/database/admin_person_db');
const AdminUtilsDb = require('../controllers/database/utils/db_utils');
const PDFDocument = require('pdfkit');
const excel = require('node-excel-export');
const fs = require('fs');

exports.select_export = function (req, res, next) {
    res.render('admin/export/export');
};

exports.export_form_choir = function (req, res, next) {
    res.render('admin/export/export_choir');
};

exports.export_choir = function (req, res, next) {
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
    let choosenFile = req.body.file;

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        console.log(rows);
        if(choosenFile === 'pdf') {
            // PDF
            let doc = new PDFDocument();
            let content = AdminExportDb.exportChoirData(rows);
            doc.pipe(fs.createWriteStream('/out.pdf'));
            doc.pipe(res);
            doc.text(content);
            doc.end();
        } else if(choosenFile === 'xls') {
            // EXCEL
            let heading = [
                ['Name', 'Fundation Year', 'Church', 'Gospel', 'Language', 'Effectif', 'Location']
            ];

            let specification = {
                name: { // <- the key should match the actual data key
                    displayName: 'Name',
                    width: 120
                },
                fundationYear: { // <- the key should match the actual data key
                    displayName: 'FundationYear',
                    width: 120
                },
                church: { // <- the key should match the actual data key
                    displayName: 'Church',
                    width: 120
                },
                gospel: { // <- the key should match the actual data key
                    displayName: 'Gospel',
                    width: 120
                },
                language: { // <- the key should match the actual data key
                    displayName: 'Language',
                    width: 120
                },
                effectif: { // <- the key should match the actual data key
                    displayName: 'Effectif',
                    width: 120
                },
                location: { // <- the key should match the actual data key
                    displayName: 'Location',
                    width: 120
                }
            };
            let dataset = [];

            rows.forEach(function(d) {
                dataset.push({name: d.Name, fundationYear: d.FundationYear, church: d.Church, gospel: d.Gospel, language: d.Language, effectif: d.Year + d.NbMembers, location: d.Address + " " + d.NPA + " " + d.City});
            });

            let merges = [];

            let report = excel.buildExport(
                [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                    {
                        name: 'Report Choir Chanter.ch',
                        heading: heading,
                        merges: merges,
                        specification: specification,
                        data: dataset
                    }
                ]
            );
            res.attachment('report.xlsx');
            return res.send(report);
        }
    });
};

exports.export_form_person = function (req, res, next) {
    res.render('admin/export/export_person');
};

exports.export_person = function (req, res, next) {
    let memberId = null;
    let lastname = null;
    let firstname = null;
    let phone = null;
    let phoneProf = null;
    let email = null;
    let startAbo = null;
    let newsletter = null;
    let location = null;

    if(req.body.memberId !== '')
        memberId = req.body.memberId;
    if(req.body.lastname !== '')
        lastname = req.body.lastname;
    if(req.body.firstname !== '')
        firstname = req.body.firstname;
    if(req.body.phone !== '')
        phone = req.body.phone;
    if(req.body.phoneProf !== '')
        phoneProf = req.body.phoneProf;
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

    let query = AdminUserDb.getExportPerson(memberId, lastname, firstname, phone, phoneProf, email, startAbo, newsletter, location);
    let choosenFile = req.body.file;

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);
        console.log(rows);
        if(choosenFile === 'pdf') {
            // PDF
            let doc = new PDFDocument();
            let content = AdminExportDb.exportPersonData(rows);
            doc.pipe(fs.createWriteStream('/out.pdf'));
            doc.pipe(res);
            doc.text(content);
            doc.end();
        } else if(choosenFile === 'xls') {
            // EXCEL
            let heading = [
                ['MemberId', 'Lastname', 'Firstname', 'Phone', 'Phone prof', 'Email', 'Start Abo', 'Newsletter', 'Location']
            ];

            let specification = {
                memberId: { // <- the key should match the actual data key
                    displayName: 'MemberId',
                    width: 120
                },
                lastname: { // <- the key should match the actual data key
                    displayName: 'Lastname',
                    width: 120
                },
                firstname: { // <- the key should match the actual data key
                    displayName: 'Firstname',
                    width: 120
                },
                phone: { // <- the key should match the actual data key
                    displayName: 'Phone',
                    width: 120
                },
                phoneP: { // <- the key should match the actual data key
                    displayName: 'Phone prof',
                    width: 120
                },
                email: { // <- the key should match the actual data key
                    displayName: 'Email',
                    width: 120
                },
                startAbo: { // <- the key should match the actual data key
                    displayName: 'Start Abo',
                    width: 120
                },
                newsletter: { // <- the key should match the actual data key
                    displayName: 'Newsletter',
                    width: 120
                },
                location: { // <- the key should match the actual data key
                    displayName: 'Location',
                    width: 120
                }
            };
            let dataset = [];

            rows.forEach(function(d) {
                dataset.push({memberId: d.MemberId, lastname: d.Lastname, firstname: d.Firstname, phone: d.Phone, phoneP: d.PhoneProf, email: d.Email, startAbo: d.StartAbo, newsletter: d.Newsletter, location: d.Address + " " + d.NPA + " " + d.City});
            });

            let merges = [];

            let report = excel.buildExport(
                [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                    {
                        name: 'Report Choir Chanter.ch',
                        heading: heading,
                        merges: merges,
                        specification: specification,
                        data: dataset
                    }
                ]
            );
            res.attachment('report.xlsx');
            return res.send(report);
        }
    });
};