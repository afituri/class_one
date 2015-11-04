var models = require("../models");
var user = require('../app/user').user_mgr;
module.exports = function (router) {
  /* GET Regions page. */ 
  router.get('/user', function(req, res) {
    user.get_users(function(result){
      res.render('user', { 
        title: 'المستخدمين', 
        users:result.rows, 
        collapse_one: 'collapse in', 
        active_one_one: 'active'
      });
    });
  });     
  /* Add Users page. */
  router.post('/user/new_user', function(req, res) {
    user.add_user(req.body,function(result){
      res.redirect(result);
    }); 
  });
  /* Edit Regions page. */
  // router.post('/region/edit_region', function(req, res) {
  //   region.edit_region(req.body,function(result){
  //     res.redirect(result);
  //   })
  // });
  /* Delete Regions page. */
  // router.post('/region/delete_region', function(req, res) {
  //   region.delete_region(req.body,function(result){
  //     res.redirect(result);
  //   })  
  // });
}