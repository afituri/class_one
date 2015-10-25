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
module.exports = function (router) {
  /* GET personals page. */
  var familyId;
  router.get('/personal/:id', function (req, res) {
    familyId=req.params.id;
    family.get_family(function (family) {
      personal.get_personal(req.params.id,function (personal){
        country.get_country(function (country){
          kinship.get_kinship(function (kinship){
            job.get_job(function(job){ 
              console.log(personal[0]);
              res.render('personal', { 
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


   router.post('/insert_personal', function (req, res) {
    console.log(req.body);
    var kinshipId = req.body.KinshipId;
    from_familyId=req.body.from_familyId;
    delete req.body.KinshipId;
    delete req.body.Motherperson_Id;
    delete req.body.from_familyId;
    //delete req.body.mother_status;
    personal.add_personal(req.body,function(result){
      member={from_familyId:from_familyId,KinshipId:kinshipId,PersonalId:result[0].insertId,FamilyId:familyId};
      personal.insert_Members(member,function(resultt){
        res.send(true);
      });
    }); 
  });

  //delete_personal
  router.get('/delete_personal/:id', function (req, res) {
    personal.delete_Members(req.params.id,function  (result){
      personal.delete_personal(req.params.id,function  (result){
        res.send(result);
      }); 
    });
  });
 
  router.get('/personal/get_city/:id', function (req, res) {
    city.get_city(req.params.id,function  (result){
      res.send(result[0]);
    });
  });

  router.get('/get_country', function (req, res) {
    country.get_country(function  (result){
      res.send(result);
    });
  });

  router.get('/get_social', function (req, res) {
    res.send(constants.social_status);
  });

  router.get('/get_religion', function (req, res) {
    res.send(constants.religion);
  });
  
  router.get('/get_registry/:reg', function (req, res) {
    family.get_family_by_registry_number(req.params.reg,function(result){
      console.log(result);
     res.send(result);   
    });
  });


  router.get('/get_Personal_in_family/:id', function (req, res) {
    family.get_personal_by_family_id(req.params.id,function(result){
      console.log(result);
      res.send(result);
    });
  });

 



    
  
}
