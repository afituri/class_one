var models = require("../models");
var region = require('../app/region').region_mgr;
var country = require('../app/country').country_mgr;
var member = require('../app/member').member_mgr;
var personal = require('../app/personal').personal_mgr;
var birth = require('../app/birth').birth_mgr;
var url=require('url');
module.exports = function (router) {

  router.get('/birth', function (req, res) {
    var id = null;
    if(url.parse(req.url, true).query.q){
      id = url.parse(req.url, true).query.q;
    }
    region.get_regions(function(result){
      country.get_country(function(countrys){
        if(id!=null){
          member.get_family_members(id,function(fpersonals){
            if(fpersonals.length==0){
              var q=false;
            }else{
              var q=true;
            }
            res.render('birth', {
            title : "افراد الاسرة" ,regions:result.rows,countrys:countrys,personals:fpersonals,q:q
            });
          });
        }else{
          res.render('birth', {
            title : "افراد الاسرة" ,regions:result.rows,countrys:countrys,q:false
          });
        }
      });
    });
  });

  router.post('/birth/new_birth',function (req, res) {
    var personal_c={};
    personal_c['Arabic_Firstname']=req.body.Arabic_Firstname;
    personal_c['Gender']=req.body.Gender;
    personal_c['Birth_Date']=req.body.Birth_Date;
    personal_c['Birth_Place']=req.body.Birth_Place;
    personal_c['city_Id']=req.body.city_Id;
    personal_c['Fatherperson_Id']=req.body.Fatherperson_Id;
    personal_c['Motherperson_Id']=req.body.Motherperson_Id;
    personal_c['Enlistingdate']=req.body.Enlistingdate;
    personal.add_personal(personal_c,function(result){
      var members_c={};
      members_c['KinshipId']=3;
      members_c['PersonalId']=result.id;
      members_c['FamilyId']=req.body.FamilyId;
      member.add_members(members_c,function(result1){
        if(req.body.newborn_reporting==2){
          var id_office=req.body.OfficeIdw;
        }else{
          var id_office=req.body.OfficeId;
        }
        var birth_c={
          birth_type: req.body.birth_type,
          children_no:req.body.children_no ,
          informer_type:req.body.informer_type ,
          informer_name:req.body.informer_name ,
          informer_address: req.body.informer_address,
          record_no:req.body.record_no ,
          record_paper_no:req.body.record_paper_no ,
          place_of_birth:req.body.place_of_birth ,
          newborn_type:req.body.newborn_type,
          newborn_reporting: req.body.newborn_reporting,
          newborn_state:req.body.newborn_state ,
          birth_state: req.body.birth_state,
          newborn_health: req.body.newborn_health,
          pregnancy_period: req.body.pregnancy_period,
          weight:req.body.weight ,
          midwife_type: req.body.midwife_type,
          midwife_name: req.body.midwife_name,
          PersonalId:result.id,
          OfficeId:id_office
        }
        birth.add_birth(birth_c,function(result2){
        });
      });
    });  
  });
}