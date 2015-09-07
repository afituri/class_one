var models = require("../models");
module.exports = function (router) {

  /* GET manucipalitys page. */
  router.get('/manucipality', function(req, res) {
    models.Manucipality.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('manucipality', { title: 'البلديات', manucipalitys:result.rows});
    });
  });

  /* Add manucipalitys page. */
  router.post('/manucipality/new_manucipality', function(req, res) {
    models.Manucipality.create(req.body).then(function(result) {
      res.send(result);
    });
  });

}