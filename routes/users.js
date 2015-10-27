var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('users', {
    title: 'المستخدمين',
    users_active: 'active'
  });
});

module.exports = router;
