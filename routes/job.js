
var models = require("../models");
module.exports = function (router) {
  /* GET Jobs page. */
  router.get('/job', function(req, res) {
    models.Job.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('job', { title: 'المناطق', jobs:result.rows});
    });
  });

  /* Add Jobs page. */
  router.post('/job/new_job', function(req, res) {
    delete req.body.job
    models.Job.create(req.body).then(function(result) {
      res.redirect("/job");
    });
  });

  /* Edit Jobs page. */
  router.post('/job/edit_job', function(req, res) {
    models.Job.update({
      job_name: req.body.job_name
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/job');
    });
  });

  /* Delete Jobs page. */
  router.post('/job/delete_job', function(req, res) {
    models.Job.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/job?msg=1');
    }).catch(function(err){
      res.redirect('/job?msg=2');
    });
  });


}
