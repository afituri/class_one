var express = require('express');
var router = express.Router();
var region = require('./region')(router);
<<<<<<< HEAD
var country = require('./country')(router);
=======
var manucipality = require('./manucipality')(router);
>>>>>>> 8debfab9c7e778c57065f19c93427a0d44d2acd9


//manucipality_name
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
