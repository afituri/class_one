var express = require('express');
var router = express.Router();
var region = require('./region')(router);
var manucipality = require('./manucipality')(router);


//manucipality_name
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
