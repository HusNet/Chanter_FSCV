
exports.index = function(req, res, next) {

    res.render('admin/index', {
        title: 'Bienvenue sur l\'admin du site Chanter.ch',
    });
};
