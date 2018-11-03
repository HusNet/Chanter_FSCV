const ChoirModel = require('../../models/choir');
const UserModel = require('../../models/user');

exports.exportChoirData = function (rows) {
    let choirModel = [];

    rows.forEach(function (row) {
        choirModel.push(new ChoirModel(row));
    });

    let out = 'Data for choir:\n';

    choirModel.forEach(function (choir) {
        out += 'Name: ' + choir.Name + '\n';
        out += 'FundationYear: ' + choir.FundationYear + '\n';
        out += 'Church: ' + choir.Church + '\n';
        out += 'Gospel: ' + choir.Gospel + '\n';
        out += 'Language: ' + choir.Language + '\n';
        out += 'Remarks: ' + choir.Remarks + '\n';
        out += 'WebPage: ' + choir.WebPage + '\n';
        out += 'EffectifId: ' + choir.EffectifId + '\n';
        out += 'Mailing: ' + choir.Mailing + '\n';
        out += 'LocationId: ' + choir.LocationId + '\n';
    });

    return out;
};

exports.exportPersonData = function (rows) {
    let userModel = [];

    rows.forEach(function (row) {
        userModel.push(new UserModel(row));
    });

    let out = 'Data for persons:\n';

    userModel.forEach(function (user) {
        out += 'MemberId: ' + user.MemberId + '\n';
        out += 'Lastname: ' + user.Lastname + '\n';
        out += 'Firstname: ' + user.Firstname + '\n';
        out += 'Phone: ' + user.Phone + '\n';
        out += 'Phone Prof: ' + user.PhoneProf + '\n';
        out += 'Email: ' + user.Email + '\n';
        out += 'Start abo: ' + user.StartAbo + '\n';
        out += 'Newsletter: ' + user.Newsletter + '\n';
        out += 'Location: ' + user.LocationId + '\n';
    });

    return out;
};