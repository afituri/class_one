var models = require("../models");
var region = require('../app/region').region_mgr;
var country = require('../app/country').country_mgr;
var member = require('../app/member').member_mgr;
var personal = require('../app/personal').personal_mgr;
var death = require('../app/death').death_mgr;
var deathreason = require("../app/deathreason").deathreason_mgr;
var user_helpers = require('../app/user_helpers');
var url=require('url');
module.exports = function (router) {
  router.get('/death',user_helpers.isLogin, function (req, res) {
    var id = null;
    if(url.parse(req.url, true).query.q){
      id = url.parse(req.url, true).query.q;
    }
    region.get_regions(function(result){
      country.get_country(function(countrys){
        deathreason.get_deathreason(function(deathreasons){
          if(id!=null){
            member.get_family_members(id,function(fpersonals){
              if(fpersonals.length==0){
                var q=false;
              }else{
                var q=true;
              }
              res.render('death', {
                title : "واقعة وفاة" ,
                regions:result.rows,
                countrys:countrys,
                deathreason:deathreasons.rows,
                personals:fpersonals,
                q:q,
                query:id,
                name: req.session.name
              });
            });
          }else{
            res.render('death', {
              title : "واقعة وفاة",
              collapse_three: 'in', 
              active_three_one: 'active',
              regions:result.rows,
              countrys:countrys,
              deathreason:deathreasons.rows,
              q:false,
              query:"",
              name: req.session.name
            });
          }
        });  
      });
    });
   });
  var perid;
  router.get('/death/personal_id/:id',user_helpers.isLogin, function (req, res) {
    perid=req.params.id;
  });
  router.post('/death/new_death',user_helpers.isLogin, function (req, res) {
    
    PersonalIdin =perid ;
    var death_c={
      PersonalId : PersonalIdin,
      CityId:req.body.city_Id,
      pod_area:req.body.pod_area,
      death_date:req.body.death_date,
      death_time:req.body.death_time,
      inform_date:req.body.inform_date,
      DeathreasonId:req.body.DeathreasonId,
      pod_description:req.body.pod_description,
      pod_type:req.body.pod_type,
      death_type:req.body.death_type,
      unatural_type:req.body.unatural_type,
      doctor_name:req.body.doctor_name,
      medical_report:req.body.medical_report,
      record_no:req.body.record_no,
      record_paper_no:req.body.record_paper_no,
      OfficeId:req.body.OfficeId
   };
    death.add_death(death_c,function(result){
      death.updet_personal(PersonalIdin,function(result){
        res.redirect('/death');  
      });
    });  
 });

  router.get('/get_death/:id',user_helpers.isLogin, function (req, res) {
    death.get_death(req.params.id,function(result){
      res.send(result);      
    });
  });
}
  