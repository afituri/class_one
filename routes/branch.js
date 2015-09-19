var models = require("../models");
var branch = require('../app/branch')
.branch_mgr;
module.exports = function (router) {
  /* GET branches page. */
  router.get('/branch', function (req, res) {
    branch.get_branch(function (result) {
      res.render('branch', {
        title: 'مكاتب الأصدار',
        branches: result.branch.rows,
        regions: result.regions
      });
    });
  });
  /* Get Branch by ID */
  router.get('/branch/get_branch/:id', function (req, res) {
    branch.get_branch_by_region_id(req.params.id, function (result) {
      res.send(result);
    });
  });
  /* Add Branches page. */
  router.post('/branch/new_branch', function (req, res) {
    branch.add_branch(req.body, function (result) {
      res.redirect(result);
    });
  });
  /* Edit Branches page. */
  router.post('/branch/edit_branch', function (req, res) {
    branch.update_branch(req.body, function (result) {
      res.redirect(result);
    });
  });
  /* Delete Branches page. */
  router.post('/branch/delete_branch', function (req, res) {
    branch.delete_branch(req.body, function (result) {
      res.redirect(result);
    });
  });
  
}
