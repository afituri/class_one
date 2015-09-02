
var models = require("../models");
module.exports = function (router) {

  /* GET Countries page. */
  router.get('/country', function(req, res) {
    models.Country.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      console.log(result);
      res.render('country', { title: 'بلدان الميلاد', countries:result.rows});
    });
  });

  /* Add Countries page. */
  router.post('/country/newcountry', function(req, res) {
    res.render('country', { title: 'بلدان الميلاد' });
  });

}
