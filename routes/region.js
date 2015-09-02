var models = require("../models");
module.exports = function (router) {

  /* GET Regions page. */
  router.get('/region', function(req, res) {
    models.Region.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('region', { title: 'المناطق', regions:result.rows});
    });
  });

  /* Add Regions page. */
  router.post('/region/newRegion', function(req, res) {
    res.render('region', { title: 'المناطق' });
  });

}