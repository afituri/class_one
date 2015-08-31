module.exports = function (router) {

  /* GET Countries page. */
  router.get('/country', function(req, res) {
    res.render('country', { title: 'بلدان الميلاد' });
  });

  /* Add Countries page. */
  router.post('/country/newCountry', function(req, res) {
    res.render('country', { title: 'بلدان الميلاد' });
  });

}