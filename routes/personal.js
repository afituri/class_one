var models = require("../models");
var constants = require("../data/constants.json");
var country = require("../app/country").country_mgr;
var city = require("../app/city").city_mgr;
var family = require("../app/family").family_mgr;
var personal = require("../app/personal").personal_mgr;
var kinship = require("../app/kinship").kinship_mgr
var job = require("../app/job").job_mgr;
var user_helpers = require('../app/user_helpers');  
module.exports = function (router) {
  /* GET personals page. */
  var familyId;
  router.get('/personal/:id',user_helpers.isLogin, function (req, res) {
    familyId=req.params.id;
    family.get_family(function (family) {
      personal.get_personal(req.params.id,function (personal){
        country.get_country(function (country){
          kinship.get_kinship(function (kinship){
            job.get_job(function(job){ 
              res.render('personal', { 
                title: 'أفراد الأسرة', 
                familys: family.result.rows,
                kinship: kinship.rows,
                job : job.rows,
                offices: family.offices,
                personal: personal[0],
                social: constants,
                country:country,
                name: req.session.name
              });
            });
          });
        });
      });
    });
  });
  ///edit_personal
  router.post('/edit_personal',user_helpers.isLogin, function (req, res) {
    if(req.body.mother_status==2){
      req.body.Motherperson_Id=null;
    }
    var kinshipId = req.body.KinshipId;
    personalId=req.body.personalId;
    from_familyId=req.body.from_familyId;
    if(from_familyId==undefined){
     from_familyId=familyId; 
    }
    if(req.body.from_familyId==-1){
      from_familyId=familyId;
    }
    var leader;
    if(req.body.KinshipId == 1){
      leader=1;
    } 
    if(req.body.KinshipId == 2){
      leader=2;
    }
    if(req.body.Motherperson_Id ==""){
      delete req.body.Motherperson_Id;
    }
    delete req.body.KinshipId;
    delete req.body.personalId;
    delete req.body.from_familyId;
    personal.edit_personal_model (req.body,personalId,function(result){
      member={leader:leader,from_familyId:from_familyId,KinshipId:kinshipId,PersonalId:personalId,FamilyId:familyId};
      personal.edit_Members(member,personalId,function(resultt){
        res.send(true);
      });
    }); 
  });

  router.post('/insert_personal',user_helpers.isLogin, function (req, res) {
    var kinshipId = req.body.KinshipId;
    from_familyId=req.body.from_familyId;
    if(from_familyId==undefined){
     from_familyId=familyId; 
    }
    var leader;
    if(req.body.KinshipId == 1){
      leader=1;
    } 
    if(req.body.KinshipId == 2){
      leader=2;
    }
    if(req.body.Motherperson_Id ==""){
      delete req.body.Motherperson_Id;
    }
    delete req.body.KinshipId;
    //delete req.body.Motherperson_Id;
    delete req.body.from_familyId;
    personal.add_personal_model (req.body,function(result){
      member={leader:leader,from_familyId:from_familyId,KinshipId:kinshipId,PersonalId:result.id,FamilyId:familyId};
      personal.insert_Members(member,function(resultt){
        res.send(true);
      });
    }); 
  });

  router.get('/delete_personal/:id',user_helpers.isLogin, function (req, res) {
    personal.delete_Members(req.params.id,function  (result){
      personal.delete_personal(req.params.id,function  (result){
        res.send(result);
      }); 
    });
  });
 
  router.get('/personal/get_city/:id',user_helpers.isLogin, function (req, res) {
    city.get_city(req.params.id,function  (result){
      res.send(result[0]);
    });
  });

  router.get('/get_country',user_helpers.isLogin, function (req, res) {
    country.get_country(function  (result){
      res.send(result);
    });
  });

  router.get('/get_social',user_helpers.isLogin, function (req, res) {
    res.send(constants.social_status);
  });

  router.get('/get_religion',user_helpers.isLogin, function (req, res) {
    res.send(constants.religion);
  });
  
  router.get('/get_registry/:reg',user_helpers.isLogin, function (req, res) {
    family.get_family_by_registry_number(req.params.reg,function(result){
     res.send(result);   
    });
  });

  router.get('/get_family_by_id/:id',user_helpers.isLogin, function (req, res) {
    family.get_family_by_id(req.params.id,function(result){
     res.send(result);   
    });
  });

  router.get('/get_Personal_in_family/:id',user_helpers.isLogin, function (req, res) {
    family.get_personal_by_family_id(req.params.id,function(result){
      res.send(result);
    });
  });  

  router.get('/get_Personal/:id',user_helpers.isLogin, function (req, res) {
    personal.get_personal_only(req.params.id,function (personal){   
      res.send(personal);
    });
  });  

  router.get('/get_country/:id',user_helpers.isLogin, function (req, res) {
    country.get_Country_id(req.params.id,function (result){
      res.send(result);
    }); 
  });
}