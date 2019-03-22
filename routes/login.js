const User = require('../models/user');


exports.form = (req, res, next) => {
    res.render('login', { title: "login" });
}

exports.submit = (req, res, next) => {
    const data = req.body.user;
    User.authenticate(data.name, data.pass, (err, user) => {
        if(err) return next(err);
        if(!user){
            res.error("Invalid useraname or password");
            res.redirect('back');
        } else {
            req.session.uid = user.id;
            res.redirect('/');
        }
    });
}

exports.logout = (req, res) => {
    req.session.destroy( err => {
        if (err) throw err;
    });
    res.redirect('/');
}