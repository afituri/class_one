var models = require("../models");
var office = require("../app/office")
  .office_mgr;
var user_helpers = require('../app/user_helpers');  
module.exports = function (router) {

  /* GET offices page. */
  router.get('/office',user_helpers.isLogin, function (req, res) {
    office.get_office(function (result) {
      res.render('office', {
        title: 'السجل المدني',
        offices: result.offices.rows,
        manucipalitys: result.manucipalitys,
        regions: result.regions,
        branches: result.branches,
        collapse_one: 'collapse in', 
        active_one_four: 'active'
      });
    })
  });

  /* Add Officees page. */
  router.post('/office/new_office',user_helpers.isLogin, function (req, res) {
    office.add_office(req.body, function (result) {
      res.redirect(result);
    })
  });

  /* Edit Offices page. */
  router.post('/office/edit_office',user_helpers.isLogin, function (req, res) {
    console.log(req.body);
    office.update_office(req.body, function(result){
      res.redirect(result);
    })
  });

  /* Delete Offices page. */
  router.post('/Office/delete_Office',user_helpers.isLogin, function (req, res) {
    office.delete_office(req.body,function(result){
      res.redirect(result);
    })
  });
  router.get('/Office/get_Office/:id',user_helpers.isLogin, function (req, res) {
    office.get_office_by_branch_id(req.params.id, function (result) {
      res.send(result);
    });
  });
}
