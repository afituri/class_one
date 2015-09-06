var models = require("../models");
module.exports = function (router) {

  /* GET kinships page. */
  router.get('/kinship', function(req, res) {
    models.Kinship.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('kinship', { title: 'صلة القرابة', kinships:result.rows});
    });
  });
  
  /* Add kinships page. */
  router.post('/kinship/new_kinship', function(req, res) {
    console.log(req.body);
    models.Kinship.create(req.body).then(function(result) {
      console.log(result);
      res.send(result);
    });
  });

}