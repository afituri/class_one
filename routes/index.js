var express = require('express');
var router = express.Router();
var region = require('./region')(router);
var country = require('./country')(router);
var manucipality = require('./manucipality')(router);
var job = require('./job')(router);
var kinship = require('./kinship')(router);
var branch = require('./branch')(router);
var office = require('./office')(router);
var family = require('./family')(router);
var personal = require('./personal')(router);
var city = require('./city')(router);
var birth = require('./birth')(router);

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title: 'ارئيسيةل'
	});
});

module.exports = router;
