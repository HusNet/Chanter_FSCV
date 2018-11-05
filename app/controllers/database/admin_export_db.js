const ChoirModel = require('../../models/choir');
const UserModel = require('../../models/user');

exports.exportChoirData = function (rows) {
     let out = 'Data for choir:\n';

    rows.forEach(function (choir) {
        out += 'Name: ' + choir.Name + '\n';
        out += 'FundationYear: ' + choir.FundationYear + '\n';
        out += 'Church: ' + choir.Church + '\n';
        out += 'Gospel: ' + choir.Gospel + '\n';
        out += 'Language: ' + choir.Language + '\n';
        out += 'Remarks: ' + choir.Remarks + '\n';
        out += 'WebPage: ' + choir.WebPage + '\n';
        out += 'Effectif: ' + choir.Year + ' : ' + choir.NbMembers + '\n';
        out += 'Mailing: ' + choir.Mailing + '\n';
        out += 'Location: ' + choir.Address + ' ' + choir.NPA + ' ' + choir.City + '\n';
    });

    return out;
};

exports.exportPersonData = function (rows) {
   let out = 'Data for persons:\n';

    rows.forEach(function (user) {
        out += 'Lastname: ' + user.Lastname + '\n';
        out += 'Firstname: ' + user.Firstname + '\n';
        out += 'Phone: ' + user.Phone + '\n';
        out += 'Phone Prof: ' + user.PhoneProf + '\n';
        out += 'Email: ' + user.Email + '\n';
        out += 'Start abo: ' + user.StartAbo + '\n';
        out += 'Newsletter: ' + user.Newsletter + '\n';
        out += 'Location: ' + user.Address + ' ' + user.NPA + ' ' + user.City + '\n';
    });

    return out;
};