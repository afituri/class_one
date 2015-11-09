var models = require("../models");
var constants = require("../data/constants.json");
var country = require("../app/country")
  .country_mgr;
var city = require("../app/city")
  .city_mgr;
var family = require("../app/family")
  .family_mgr;
var personal = require("../app/personal")
  .personal_mgr;
var kinship = require("../app/kinship")
  .kinship_mgr
var job = require("../app/job")
  .job_mgr;
var user_helpers = require('../app/user_helpers');  
module.exports = function (router) {
  var familyId;
  router.get('/report_personal/:id',user_helpers.isLogin, function (req, res) {
    familyId=req.params.id;
    console.log(familyId);
    family.get_family(function (family) {
      personal.get_personal(req.params.id,function (personal){
        country.get_country(function (country){
          kinship.get_kinship(function (kinship){
            job.get_job(function(job){ 
              res.render('report_personal', { 
                title: 'أفراد الأسرة', 
                familys: family.result.rows,
                kinship: kinship.rows,
                job : job.rows,
                offices: family.offices,
                personal: personal[0],
                social: constants,
                country:country,
              });
            });
          });
        });
      });
    });
  });


};