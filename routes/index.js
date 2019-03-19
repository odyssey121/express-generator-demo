var express = require('express');
var router = express.Router();
const entries = require('./entries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get form
router.get('/post', entries.form);
//post form
router.post('/post', entries.submit);
//list entries
router.get('/entries', entries.list);

module.exports = router;
