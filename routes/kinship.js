var models = require("../models");
module.exports = function (router) {

  /* GET manucipalitys page. */
  router.get('/kinship', function(req, res) {
    models.Kinship.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      console.log(result);
      res.render('kinship', { title: 'صلة القرابة', kinships:result.rows});
    });
  });

  /* Add manucipalitys page. */
  router.post('/kinship/newkinship', function(req, res) {
    res.render('kinship', { title: 'صلة القرابة' });
  });

}