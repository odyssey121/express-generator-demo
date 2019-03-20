var express = require('express');
var router = express.Router();
const entries = require('./entries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// get form
router.get('/post', entries.form);
//post form
router.post('/post', titleRequired,
  titleLengthRequired,
  entries.submit);
//list entries
router.get('/entries', entries.list);

//Myvalidators
function titleRequired(req, res, next) {
  const title = req.body.entry.title;
  if (!title) {
    res.status(err.status || 500);
    res.render('fdfs',{error:'fsdfsd'});
  } else {
    next();
  }
};

function titleLengthRequired(req, res, next) {
  console.log(req.body);
  const title = req.body.entry.title;
  if (title.length > 4) {
    next();
  } else {
    res.status(err.status || 500);
    res.render('tittle minimum length 4',{error:'fsdf'});
  }
};



module.exports = router;
