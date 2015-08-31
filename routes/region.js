
module.exports = function (router) {

  /* GET Regions page. */
  router.get('/region', function(req, res) {
    res.render('region', { title: 'المناطق' });
  });

  /* Add Regions page. */
  router.post('/region/newRegion', function(req, res) {
    res.render('region', { title: 'المناطق' });
  });

}