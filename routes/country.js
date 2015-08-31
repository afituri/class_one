
var models = require("../models");
module.exports = function (router) {

  /* GET Countries page. */
  router.get('/Country', function(req, res) {
    models.Country.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      console.log(result);
      res.render('Country', { title: 'بلدان الميلاد', countries:result.rows});
    });
  });

  /* Add Countries page. */
  router.post('/Country/newCountry', function(req, res) {
    res.render('Country', { title: 'بلدان الميلاد' });
  });

}
