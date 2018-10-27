const C = require('../../config/appConfig');
const AdminExportDb = require('../controllers/database/admin_export_db');
const AdminChoirDb = require('../controllers/database/admin_choir_db');
const AdminUtilsDb = require('../controllers/database/utils/db_utils');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.select_export = function (req, res, next) {
    res.render('admin/export/export');
};

exports.export_form_choir = function (req, res, next) {
    res.render('admin/export/export_choir');
};

exports.export_choir = function (req, res, next) {
    let query = AdminChoirDb.getAllChoir();

    C.db.query(query, function (err, rows, fields) {
        if (err) throw(err);

        let doc = new PDFDocument();
        let content = AdminExportDb.exportChoirData(rows);
        doc.pipe(fs.createWriteStream('/out.pdf'));
        doc.pipe(res);
        doc.text(content);
        doc.end();
    });
};

exports.export_form_person = function (req, res, next) {
    res.render('admin/export/export_person');
};

exports.export_person = function (req, res, next) {

};