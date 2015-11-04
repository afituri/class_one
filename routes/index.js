var express = require('express');
var router = express.Router();
var login = require('../app/login')(router);
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
var reports = require('./reports')(router);
var report_family = require('./report_family')(router);
var report_personal = require('./report_personal')(router);
var deathreason = require('./deathreason')(router);
var birth = require('./birth')(router);
var death = require('./death')(router);
var marriage = require('./marriage')(router);
var divorce = require('./divorce')(router);
var user = require('./user')(router);



/* GET login page. */
router.get('/', function (req, res) {
  res.render('login', {
    title: 'شاشة الدخول'
  });
});

/* GET home page. */
router.get('/home', function (req, res) {
  res.render('index', {
    title: 'الرئيسية'
  });
});

module.exports = router;
