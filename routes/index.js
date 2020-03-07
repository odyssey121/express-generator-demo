var express = require("express");
var router = express.Router();
const entries = require("./entries");
const register = require("./register");
const login = require("./login");
const pagination = require("../middleware/pagination");
const Entry = require("../models/Entry");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// get form
router.get("/post", entries.form);
//post form
router.post("/post", entries.submit);
//list entries
router.get("/entries", pagination(Entry.count, 3), entries.list);
//Register
router.get("/register", register.form);
router.post("/register", titleRequired, titleLengthRequired, register.submit);

//login
router.get("/login", login.form);
router.post("/login", login.submit);
router.get("/logout", login.logout);

//Myvalidators
function titleRequired(req, res, next) {
  const username = req.body.user.name;
  if (!username) {
    res.error("username is required.");
    res.redirect("back");
  } else {
    next();
  }
}

function titleLengthRequired(req, res, next) {
  const username = req.body.user.name;
  if (username.length > 4) {
    next();
  } else {
    res.error("length > 4 must have");
    res.redirect("back");
  }
}

module.exports = router;
