var models = require("../models");
var region = require('../app/region').region_mgr;
module.exports = function (router) {
  /* GET Regions page. */ 
  router.get('/region', function(req, res) {
    region.get_regions(function(result){
      res.render('region', { title: 'المناطق', regions:result.rows});
    });
  });     
  /* Add Regions page. */
  router.post('/region/new_region', function(req, res) {
    region.add_region(req.body,function(result){
      res.redirect("/region");
    }) 
  });
  /* Edit Regions page. */
  router.post('/region/edit_region', function(req, res) {
    region.edit_region(req.body,function(result){
      res.redirect('/region');
    })
  });
  /* Delete Regions page. */
  router.post('/region/delete_region', function(req, res) {
    region.delete_region(req.body,function(result){
      res.redirect(result);
    })  
  });
}