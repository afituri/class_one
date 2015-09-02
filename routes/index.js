var express = require('express');
var router = express.Router();
var region = require('./region')(router);
var country = require('./country')(router);
var manucipality = require('./manucipality')(router);
var kinship = require('./kinship')(router);

//manucipality_name
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
