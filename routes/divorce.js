var models = require("../models");
var family = require("../app/family")
  .family_mgr;
var divorce = require("../app/divorce")
  .divorce_mgr;  
// var branch = require('../app/branch')
//   .branch_mgr;  
var office = require("../app/office")
  .office_mgr; 
var country = require('../app/country').country_mgr;

var region = require('../app/region').region_mgr;
module.exports = function (router) {

  router.get('/divorce', function (req, res) {
    family.get_family(function (result) {
      region.get_regions(function(result1) {
        country.get_country(function(countrys){
          res.render('divorce', {
            title : "واقعة الطﻻق",familys: result.result.rows,
            regions:result1.rows,
            countrys:countrys
          });
        })  
      })
    });  
  });
  /*------------*/
  var familyId;
  router.get('/divorce/:id', function (req, res) {
    familyId=req.params.id;
      divorce.get_wife(familyId,function (wife){  
        divorce.get_father(familyId,function (father){
          var names = {
          wifes : wife,
          fathers :  father,
          };
          console.log(names.wifes);
          res.send(names);
        })
      })
  });
  /*============*/
  var sunId;
  router.get('/divorce/suns/:id', function (req, res) {
    sunId=req.params.id;
      divorce.get_suns(sunId,function (suns){
        console.log(suns[0]);
        res.send(suns[0]);
     })
  });
  /*===============*/
  router.get('/divorce/Personal/:id', function (req, res) {
    divorce.get_Personal(req.params.id,function (per){
      res.send(per[0]);
    })
  });
/*==================*/
  router.post('/divorce/new_divorce',function (req, res) {
    if(req.body.wife_custody == 'on')
      {
        var w_custody = 1;
      }
      else
      {
        var w_custody = 2;
      }
    var divorce_c = {
      wife_custody : w_custody,
      husband_personal_Id : req.body.father_name,
      wife_personal_Id : req.body.waif_name,
      wife_bt_family : req.body.wife_bt_family,
      officeId : req.body.officeId,
      divorce_place : req.body.divorce_place,
      divorce_date : req.body.divorce_date,
      contract_number : req.body.contract_divorce_number,
      record_divorce_nu : req.body.record_divorce_number,
      inform_date : req.body.inform_date,
      city_Id : req.body.city_Id,
      divorce_type : req.body.divorce_type
    };
    console.log(divorce_c);
    divorce.add_divorce(divorce_c,function(result2){
    });
  //   personal_c['Arabic_Firstname']=req.body.OfficeId;
  //   console.log(personal_c);
    // personal_c['Gender']=req.body.Gender;
    // personal_c['Birth_Date']=req.body.Birth_Date;
    // personal_c['Birth_Place']=req.body.Birth_Place;
    // personal_c['city_Id']=req.body.city_Id;
    // personal_c['Fatherperson_Id']=req.body.Fatherperson_Id;
    // personal_c['Motherperson_Id']=req.body.Motherperson_Id;
    // personal_c['Enlistingdate']=req.body.Enlistingdate;
    // personal.add_personal(personal_c,function(result){
    //   var members_c={};
    //   members_c['KinshipId']=3;
    //   members_c['PersonalId']=result.id;
    //   members_c['FamilyId']=req.body.FamilyId;
    //   member.add_members(members_c,function(result1){
    //     if(req.body.newborn_reporting==2){
    //       var id_office=req.body.OfficeIdw;
    //     }else{
    //       var id_office=req.body.OfficeId;
    //     }
    //     var birth_c={
    //       birth_type: req.body.birth_type,
    //       children_no:req.body.children_no ,
    //       informer_type:req.body.informer_type ,
    //       informer_name:req.body.informer_name ,
    //       informer_address: req.body.informer_address,
    //       record_no:req.body.record_no ,
    //       record_paper_no:req.body.record_paper_no ,
    //       place_of_birth:req.body.place_of_birth ,
    //       newborn_type:req.body.newborn_type,
    //       newborn_reporting: req.body.newborn_reporting,
    //       newborn_state:req.body.newborn_state ,
    //       birth_state: req.body.birth_state,
    //       newborn_health: req.body.newborn_health,
    //       pregnancy_period: req.body.pregnancy_period,
    //       weight:req.body.weight ,
    //       midwife_type: req.body.midwife_type,
    //       midwife_name: req.body.midwife_name,
    //       PersonalId:result.id,
    //       OfficeId:id_office
    //     }
    //     birth.add_birth(birth_c,function(result2){
    //     });
    //   });
    // });  
  });
}