module.exports = function (router) {

  /* GET manucipality page. */
  router.get('/manucipality', function(req, res) {
    res.render('manucipality', { title: 'البلديات' });
  });

  /* Add manucipality page. */
  router.post('/manucipality/newmanucipality', function(req, res) {
    res.render('manucipality', { title: 'البلديات' });
  });

}