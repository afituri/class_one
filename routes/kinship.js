var models = require("../models");
var kinship = require("../app/kinship")
  .kinship_mgr;
var user_helpers = require('../app/user_helpers');  
module.exports = function (router) {

  /* GET kinships page. */
  router.get('/kinship',user_helpers.isLogin, function (req, res) {
    kinship.get_kinship(function (result) {
      res.render('kinship', {
        title: 'صلة القرابة',
        kinships: result.rows,
        collapse_one: 'collapse in', 
        active_one_five: 'active',
        name: req.session.name
      });
    })
  });

  /* Add Manucipalitys page. */
  router.post('/kinship/new_kinship',user_helpers.isLogin, function (req, res) {
    kinship.add_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Edit Regions page. */
  router.post('/kinship/edit_kinship',user_helpers.isLogin, function (req, res) {
    kinship.update_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Delete Offices page. */
  router.post('/kinship/delete_kinship',user_helpers.isLogin, function (req, res) {
    kinship.delete_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });
}
