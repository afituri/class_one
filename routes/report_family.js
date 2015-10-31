var models = require("../models");
var family = require("../app/family")
  .family_mgr;
module.exports = function (router) {
  router.get('/report_family', function (req, res) {
    family.get_family(function (result) {
      res.render('report_family', { 
        title: 'الأسر',
        collapse_two: 'in', 
        active_two_one: 'active',
        familys: result.result.rows,
        offices: result.offices
      });
    });
  });


};