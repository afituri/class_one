
var models = require("../models");
module.exports = function (router) {

  /* GET jobs page. */
  router.get('/job', function(req, res) {
    models.Job.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      console.log(result);
      res.render('job', { title: 'المهن', jobs:result.rows});
    });
  });

  /* Add jobs page. */
  router.post('/job/newjob', function(req, res) {
    res.render('job', { title: 'المهن' });
  });

}
