var express = require('express');
var router = express.Router();
var region = require('./region')(router);
var country = require('./country')(router);
var manucipality = require('./manucipality')(router);
var job = require('./job')(router);
var kinship = require('./kinship')(router);
var branch = require('./branch')(router);
var branch = require('./office')(router);
var branch = require('./family')(router);
var personal = require('./personal')(router);
var city = require('./city')(router);


>>>>>>> 64faa22bcc5ded99f5fc27acaacc2443b581fd4e
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
