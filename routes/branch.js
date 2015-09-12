var models = require("../models");
module.exports = function (router) {

  /* GET branches page. */
  router.get('/branch', function(req, res) {
    models.Branch.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include :[{
        model: models.Region,
        where: { status: 1 }

      }]
    }).then(function(result) {
      models.Region.findAll({
        where: {
          status: 1
        }
      }).then(function(regions){
        res.render('branch', { title: 'مكاتب الأصدار', branches:result.rows, regions: regions});  
      })
    });
  });

  /* Get Branch by ID */
  router.get('/branch/get_branch/:id', function(req, res) {
    models.Branch.findAll({
      where: {
        status: 1,
        RegionId: req.params.id
      }
    }).then(function(branches){
      res.send(branches);      
    })
  });

  /* Add Branches page. */
  router.post('/branch/new_branch', function(req, res) {
    models.Branch.create(req.body).then(function(result) {
      res.redirect("/branch");
    });
  });

  /* Edit Branches page. */
  router.post('/branch/edit_branch', function(req, res) {
    models.Branch.update({
      branch_name: req.body.branch_name,
      RegionId: req.body.RegionId
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/branch');
    });
  });

  /* Delete Branches page. */
  router.post('/branch/delete_branch', function(req, res) {
    models.Branch.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/branch?msg=1');
    }).catch(function(err){
      res.redirect('/branch?msg=2');
    });
  });
    


}