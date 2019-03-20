const Entry = require('../models/entry');

exports.list = (req, res, next) => {
    Entry.getRange(0,-1, (err , items) => {
        if(err) return next(err);
        res.render('entries', {
            title:'Entries',
            entries:items,
        });
        console.log(items);
    });
}


exports.form = (req, res, next) => {
    res.render('form',{title:'Post'});
}
exports.submit = (req, res, next) => {
    const data = req.body.entry;
    console.log(req.body);
    const entry = new Entry({
        title:data.title,
        body:data.body
    });
    entry.save( err => {
        if(err) return next(err);
        res.redirect('/');
    });

}
