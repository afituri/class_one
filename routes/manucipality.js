var models = require("../models");
module.exports = function (router) {

  /* GET manucipalitys page. */
  router.get('/manucipality', function(req, res) {
    models.Manucipality.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      console.log(result);
      res.render('manucipality', { title: 'البلديات', manucipalitys:result.rows});
    });
  });

  /* Add manucipalitys page. */
  router.post('/manucipality/newmanucipality', function(req, res) {
    res.render('manucipality', { title: 'البلديات' });
  });

}