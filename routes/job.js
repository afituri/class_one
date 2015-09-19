
var models = require("../models");
var job = require("../app/job").job_mgr;
module.exports = function (router) {
  /* GET Jobs page. */
  router.get('/job', function(req, res) {
    job.get_job(function(result){
      res.render('job', { title: 'المناطق', jobs:result.rows});
    });
  });

  /* Add Jobs page. */
  router.post('/job/new_job', function(req, res) {
    job.add_job(req.body, function (result) {
      res.redirect(result);
    });
  });


  /* Edit Jobs page. */
  router.post('/job/edit_job', function(req, res) {
    job.update_job(req.body, function(result){
      res.redirect(result);
    })
  });


  /* Delete Jobs page. */
  router.post('/job/delete_job', function(req, res) {
    job.delete_job(req.body,function(result){
      res.redirect(result);
    })
  });


}
