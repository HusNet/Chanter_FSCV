
exports.login = function(req, res, next) {

    res.render('login/login', {
        title: 'Connexion to the FSCV administration panel',
        body: 'Please enter your information :'
    });

};

exports.login_do = function(req, res, next) {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let session = req.session;

    console.log(id + " is trying to connect");

    // check if phone number exists in database
    // TODO : Request DB

    // TODO : get clients infos from db when db query done
        let client = {
            _id: 1234,
            name: 'Michel',
            pwd: 4321,
        };

        if(client._id != id){

            res.render('login/error', {

                title: 'Error while connecting',
                errorMessage:  'User unknown'
            });

            console.log("User unknown");
        }
        else if (client.pwd == pwd){
            session.clientId = client._id;
            session.save();
            console.log(client);
            console.log(session.clientId);

            // TODO : save client and check errors

            console.log('Client connected ...');

            res.redirect('/admin');

        }
        else {
            res.render('login/error', {

                title: 'Error while connecting',
                errorMessage:  'Wrong password'
            });

            console.log("Password wrong for user " + id);
        }


    // TODO : catch db query errors

};
