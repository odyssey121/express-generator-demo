var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
//myInports
const messages = require("./middleware/messages");
const loadUser = require("./middleware/loadUser");
const api = require("./routes/api");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("json spaces", 2);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(cookieParser());
//express Session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
);

// api include url
app.use("/api", api.auth);

// api urls route
app.get("/api/user/:id", api.user);

app.post("/api/post", api.post);

const Pagination = require("./middleware/pagination"); // pagination for post list
const Entry = require("./models/entry"); // model entry

app.get("/api/entries/:query?", Pagination(Entry.count), api.postLists);

// include messages
app.use(messages);
// include loadUser middleware
app.use(loadUser);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
