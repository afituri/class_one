var models = require("../models");
var manucipality = require("../app/manucipality")
  .manucipality_mgr;
var user_helpers = require('../app/user_helpers');  
module.exports = function (router) {
  /* GET Manucipalitys page. */
  router.get('/manucipality',user_helpers.isLogin, function (req, res) {
    manucipality.get_manucipality(function (result) {
      res.render('manucipality', {
        title: 'البلديات',
        manucipalitys: result.rows,
        collapse_one: 'collapse in', 
        active_one_three: 'active'
      });
    })
  });

  /* Add Manucipalitys page. */
  router.post('/manucipality/new_manucipality',user_helpers.isLogin, function (req, res) {
    manucipality.add_manucipality(req.body, function (result) {
      res.redirect(result);
    });
  });

  /* Edit Manucipalitys page. */
  router.post('/manucipality/edit_manucipality',user_helpers.isLogin, function (req, res) {
    manucipality.update_manucipality(req.body, function (result) {
      res.redirect(result);
    })
  });

  /* Delete Manucipalitys page. */
  router.post('/manucipality/delete_manucipality',user_helpers.isLogin, function (req, res) {
    manucipality.delete_manucipality(req.body, function (result) {
      res.redirect(result);
    })
  });
}
