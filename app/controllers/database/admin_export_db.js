const ChoirModel = require('../../models/choir');

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