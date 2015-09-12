var models = require("../models");
module.exports = function (router) {

  /* GET offices page. */
  router.get('/office', function(req, res) {
    models.Office.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include :[{
        model: models.Branch,
        where: { status: 1 },
        include :[{
          model : models.Region,
          where:{status: 1}
        }]
      },{
        model: models.Manucipality,
        where: { status: 1 }
      }]
    }).then(function(offices) {
      models.Region.findAll({
        where: {
          status: 1
        }
      }).then(function(regions){
        models.Branch.findAll({
        where: {
          status: 1
        }
      }).then(function(branches){
        models.Manucipality.findAll({
          where: {
            status: 1
          }
        }).then(function(manucipalitys){
          res.render('office', { title: 'السجل المدني', offices:offices.rows, manucipalitys: manucipalitys, regions: regions, branches:branches});  
        });
      });
    });
  });
});

  /* Add Officees page. */
  router.post('/office/new_office', function(req, res) {
    delete req.body.region
    models.Office.create(req.body).then(function(result) {
      res.redirect("/office");
    });
  });

  /* Edit Offices page. */
  router.post('/office/edit_office', function(req, res) {
    models.Office.update({
      office_name: req.body.office_name,
      BranchId: req.body.BranchId,
      ManucipalityId: req.body.ManucipalityId,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/office');
    });
  });

  /* Edit Offices page. */
  router.post('/office/delete_office', function(req, res) {
    models.Office.destroy({
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/office');
    });
  });

  /* Delete Offices page. */
  router.post('/Office/delete_Office', function(req, res) {
    models.Office.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/Office?msg=1');
    }).catch(function(err){
      res.redirect('/Office?msg=2');
    });
  });

}