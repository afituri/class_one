var models = require("../models");
var kinship = require("../app/kinship")
  .kinship_mgr;
module.exports = function (router) {

  /* GET kinships page. */
  router.get('/kinship', function (req, res) {
    kinship.get_kinship(function (result) {
      res.render('kinship', {
        title: 'صلة القرابة',
        kinships: result.rows
      });
    })
  });

  /* Add Manucipalitys page. */
  router.post('/kinship/new_kinship', function (req, res) {
    kinship.add_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Edit Regions page. */
  router.post('/kinship/edit_kinship', function (req, res) {
    kinship.update_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Delete Offices page. */
  router.post('/kinship/delete_kinship', function (req, res) {
    kinship.delete_kinship(req.body,function (result) {
      res.redirect(result);
    })
  });
}
