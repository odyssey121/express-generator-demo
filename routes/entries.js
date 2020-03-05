const Entry = require("../models/entry");

exports.list = (req, res, next) => {
  const { pagination } = req;
  res.locals.page = pagination;
  Entry.getRange(pagination.pageFrom, pagination.pageTo, (err, items) => {
    if (err) return next(err);
    res.render("entries", {
      title: "Entries",
      entries: items
    });
  });
};

exports.form = (req, res, next) => {
  res.render("form", { title: "Post" });
};
exports.submit = (req, res, next) => {
  const data = req.body.entry;
  const { user } = req;
  const entry = new Entry({
    title: data.title,
    body: data.body,
    author: user ? user.name : "Guest"
  });
  entry.save(err => {
    if (err) return next(err);
    res.redirect("/");
  });
};
