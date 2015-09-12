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

  /* Add Manucipalitys page. */
  router.post('/kinship/new_kinship', function(req, res) {
    delete req.body.kinship
    models.Kinship.create(req.body).then(function(result) {
      res.redirect("/kinship");
    });
  });
  
  // /* Add kinships page. */
  // router.post('/kinship/new_kinship', function(req, res) {
  //   console.log(req.body);
  //   models.Kinship.create(req.body).then(function(result) {
  //     console.log(result);
  //     res.send(result);
  //   });
  // });

  /* Edit Regions page. */
  router.post('/kinship/edit_kinship', function(req, res) {
    models.Kinship.update({
      kinship_name: req.body.kinship_name
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/kinship');
    });
  });

  /* Delete Offices page. */
  router.post('/kinship/delete_kinship', function(req, res) {
    models.Kinship.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/kinship?msg=1');
    }).catch(function(err){
      res.redirect('/kinship?msg=2');
    });
  });


}