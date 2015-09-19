var models = require("../models");
var family = require("../app/family")
  .family_mgr;
module.exports = function (router) {
  /* GET families page. */
  router.get('/family', function (req, res) {
    family.get_family(function (result) {
        res.render('family', { title: 'الأسر', familys:result.result.rows,offices: result.offices});
    });
  });



  /* Add Family page. */
  router.post('/family/new_family', function (req, res) {
    family.add_family(req.body, function (result) {
      res.redirect(result);
    });
  });


  /* Edit Family page. */
  router.post('/family/edit_family', function (req, res) {
    family.update_family(req.body, function (result) {
      res.redirect(result);
    })
  });


  /* Delete Familys page. */
  router.post('/family/delete_family', function (req, res) {
    models.Family.destroy({
        where: {
          id: req.body.id
        }
      })
      .then(function (result) {
        res.redirect('/family?msg=1');
      })
      .catch(function (err) {
        res.redirect('/family?msg=2');
      });
  });

}
