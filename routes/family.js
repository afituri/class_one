var models = require("../models");
var family = require("../app/family")
  .family_mgr;
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /* GET families page. */
  router.get('/family',user_helpers.isLogin, function (req, res) {
    family.get_family(function (result) {
      res.render('family', { 
        title: 'الأسر',
        collapse_two: 'in', 
        active_two_one: 'active',
        familys: result.result.rows,
        offices: result.offices,
        name: req.session.name
      });
    });
  });

  /* Add Family page. */
  router.post('/family/new_family',user_helpers.isLogin, function (req, res) {
   // console.log(req.body);
    family.add_family(req.body, function (result) {
      res.send(result);
    });
  });

  /* Edit Family page. */
  router.post('/family/edit_family',user_helpers.isLogin, function (req, res) {
    family.edit_family (req.body, function (result) {
      res.redirect(result);
    })
  });

  /* Delete Familys page. */
  router.post('/family/delete_family',user_helpers.isLogin, function (req, res) {
    family.delete_family(req.body, function (result) {
      res.redirect(result);
    })
  });

  /* GET branches page. */
/*  router.get('/family',user_helpers.isLogin, function (req, res) {
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
*/
  // /* Get Branch by ID */
  // router.get('/family/get_family/:id',user_helpers.isLogin, function(req, res) {
  //   models.Branch.findAll({
  //     where: {
  //       status: 1,
  //       RegionId: req.params.id
  //     }
  //   }).then(function(branches){
  //     res.send(branches);
  //   })
  // });

}
