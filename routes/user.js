var models = require("../models");
var user = require('../app/user').user_mgr;
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /* GET Regions page. */ 
  router.get('/user',user_helpers.isLogin, function(req, res) {
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
  router.post('/user/new_user',user_helpers.isLogin, function(req, res) {
    user.add_user(req.body,function(result){
      res.redirect(result);
    }); 
  });

  router.get('/user/get_user/:id',user_helpers.isLogin, function(req, res) {
    user.get_user(req.params.id,function(result){
      res.send(result);
    }); 
  });
  router.post('/user/update',user_helpers.isLogin, function(req, res) {
    user.update_user(req.body,function(result){
      res.redirect(result);
    }); 
  });
  router.post('/user/delete',user_helpers.isLogin, function(req, res) {
    user.delete_user(req.body.id_u,function(result){
      res.redirect(result);
    }); 
  });
  /* Edit Regions page. */
  // router.post('/region/edit_region',user_helpers.isLogin, function(req, res) {
  //   region.edit_region(req.body,function(result){
  //     res.redirect(result);
  //   })
  // });
  /* Delete Regions page. */
  // router.post('/region/delete_region',user_helpers.isLogin, function(req, res) {
  //   region.delete_region(req.body,function(result){
  //     res.redirect(result);
  //   })  
  // });
}