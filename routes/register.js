const User = require('../models/user');



exports.form = (req, res, next) => {
    res.render('register', {title:'register'});
}

exports.submit = (req, res, next) => {
    const data = req.body.user;
    User.getByName(data.name, (err, user) => {
        if(err) return next(err);
        if(user.id){
            res.error('username already taken!');
            res.redirect('back');
        } else {
            user = new User({
                name:data.name,
                pass:data.pass
            });
            user.save( err => {
                if (err) return next(err);
                console.log(req.session.uid);
                req.session.uid = user.id;
                res.redirect('/');
            });
        }
    });
}