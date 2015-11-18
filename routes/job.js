var models = require("../models");
var job = require("../app/job").job_mgr;
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /* GET Jobs page. */
  router.get('/job',user_helpers.isLogin, function(req, res) {
    models.Job.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('job', { 
        title: 'المهن', 
        jobs:result.rows,
        collapse_one: 'collapse in', 
        active_one_six: 'active',
        name: req.session.name
      });
    });
  });

  /* Add Jobs page. */
  router.post('/job/new_job',user_helpers.isLogin, function(req, res) {
    job.add_job(req.body, function (result) {
      res.redirect(result);
    });
  });

  /* Edit Jobs page. */
  router.post('/job/edit_job',user_helpers.isLogin, function(req, res) {
    job.update_job(req.body, function(result){
      res.redirect(result);
    })
  });

  /* Delete Jobs page. */
  router.post('/job/delete_job',user_helpers.isLogin, function(req, res) {
    job.delete_job(req.body,function(result){
      res.redirect(result);
    })
  });

}
