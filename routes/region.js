var models = require("../models");
var region = require('../app/region').region_mgr;
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /* GET Regions page. */ 
  router.get('/region',user_helpers.isLogin, function(req, res) {
    region.get_regions(function(result){
      res.render('region', { 
        title: 'المناطق', 
        regions:result.rows, 
        collapse_one: 'collapse in', 
        active_one_one: 'active'
      });
    });
  });     
  /* Add Regions page. */
  router.post('/region/new_region',user_helpers.isLogin, function(req, res) {
    region.add_region(req.body,function(result){
      res.redirect(result);
    }) 
  });
  /* Edit Regions page. */
  router.post('/region/edit_region',user_helpers.isLogin, function(req, res) {
    region.edit_region(req.body,function(result){
      res.redirect(result);
    })
  });
  /* Delete Regions page. */
  router.post('/region/delete_region',user_helpers.isLogin, function(req, res) {
    region.delete_region(req.body,function(result){
      res.redirect(result);
    })  
  });
}