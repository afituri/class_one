var models = require("../models");
var family = require("../app/family")
  .family_mgr;
module.exports = function (router) {

  router.get('/divorce', function (req, res) {
    family.get_family(function (result) {
      res.render('divorce', {
        title : "واقعة الطﻻق",familys: result.result.rows,
      });
    });  
  });
}