var models = require("../models");
var family = require("../app/family")
  .family_mgr;
// var branch = require('../app/branch')
//   .branch_mgr;  
var office = require("../app/office")
  .office_mgr; 
//var region = require('../app/region').region_mgr;
module.exports = function (router) {

  router.get('/divorce', function (req, res) {
    family.get_family(function (result) {
      office.get_office(function (result1) {
        res.render('divorce', {
          title : "واقعة الطﻻق",familys: result.result.rows,
          offices: result.offices.rows,
          regions: result1.regions,
          branches: result1.branches
        });
      })
    });  
  });
  router.get('/divorce/get_branch_by_region_id/:id', function (req, res) {
    branch.get_branch_by_region_id(req.params.id, function (result) {
      res.send(result);
    });
  });
}