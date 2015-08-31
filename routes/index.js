var express = require('express');
var router = express.Router();
var region = require('./region')(router);


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
