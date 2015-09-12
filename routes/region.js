var models = require("../models");
module.exports = function (router) {

  /* GET Regions page. */
  router.get('/region', function(req, res) {
    models.Region.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('region', { title: 'المناطق', regions:result.rows});
    });
  });

  /* Add Regions page. */
  router.post('/region/new_region', function(req, res) {
    delete req.body.region
    models.Region.create(req.body).then(function(result) {
      res.redirect("/region");
    });
  });

  /* Edit Regions page. */
  router.post('/region/edit_region', function(req, res) {
    models.Region.update({
      region_name: req.body.region_name
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/region');
    });
  });

  /* Delete Regions page. */
  router.post('/region/delete_region', function(req, res) {
    models.Region.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/region?msg=1');
    }).catch(function(err){
      res.redirect('/region?msg=2');
    });
  });
}