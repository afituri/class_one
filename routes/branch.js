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
        res.render('branch', { title: 'المناطق', branches:result.rows, regions: regions});  
      })
    });
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

}