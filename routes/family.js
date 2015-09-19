var models = require("../models");
module.exports = function (router) {

  /* GET branches page. */
  router.get('/family', function (req, res) {
    models.Family.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include: [{
        model: models.Office,
        where: {
          status: 1
        }
      }]
    }).then(function (result) {
      models.Office.findAll({
        where: {
          status: 1
        }
      }).then(function (offices) {
          res.render('family', {
            title: 'مكاتب الأصدار',
            familys: result.rows,
            offices: offices
          });
        })
      });
    });

  // /* Get Branch by ID */
  // router.get('/family/get_family/:id', function(req, res) {
  //   models.Branch.findAll({
  //     where: {
  //       status: 1,
  //       RegionId: req.params.id
  //     }
  //   }).then(function(branches){
  //     res.send(branches);
  //   })
  // });

  /* Add Familys page. */
  router.post('/family/new_family', function (req, res) {
    models.Family.create(req.body)
      .then(function (result) {
        res.redirect("/family");
      });
  });

  /* Edit Familys page. */
  router.post('/family/edit_family', function (req, res) {
    models.Family.update({
        FamilyId: req.body.FamilyId
      } , {
        where: {
          id: req.body.id
        }
    }).then(function (result) {
      res.redirect('/family');
    });
  });

  /* Delete Familys page. */
  router.post('/family/delete_family', function (req, res) {
    models.Family.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (result) {
      res.redirect('/family?msg=1');
    }).catch(function (err) {
      res.redirect('/family?msg=2');
    });
  });
}
