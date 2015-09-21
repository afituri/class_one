var models = require("../models");
var office = require("../app/office")
  .office_mgr;
module.exports = function (router) {

  /* GET offices page. */
  router.get('/office', function (req, res) {
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
  router.post('/office/new_office', function (req, res) {
    office.add_office(req.body, function (result) {
      res.redirect(result);
    })
  });

  /* Edit Offices page. */
  router.post('/office/edit_office', function (req, res) {
    office.update_office(req.body, function(result){
      res.redirect(result);
    })
  });

  /* Delete Offices page. */
  router.post('/Office/delete_Office', function (req, res) {
    office.delete_Office(req.body,function(result){
      res.redirect(result);
    })
  });

}
