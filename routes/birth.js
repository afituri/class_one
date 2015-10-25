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
            title : "افراد الاسرة" ,regions:result.rows,countrys:countrys,personals:fpersonals,q:q,query:id
            });
          });
        }else{
          res.render('birth', {
            title : "افراد الاسرة" ,regions:result.rows,countrys:countrys,q:false,query:""
          });
        }
      });
    });
  });

  router.post('/birth/new_birth',function (req, res) {
    var personal_c={
      Arabic_Firstname:req.body.Arabic_Firstname,
      Gender:req.body.Gender,
      Birth_Date:req.body.Birth_Date,
      Birth_Place:req.body.Birth_Place,
      city_Id:req.body.city_Id,
      Fatherperson_Id:req.body.Fatherperson_Id,
      Motherperson_Id:req.body.Motherperson_Id,
      Enlistingdate:req.body.Enlistingdate,
      Arabic_Fathername:req.body.Arabic_Fathername,
      Arabic_Grandfathername:req.body.Arabic_Grandfathername,
      Arabic_Familyname:req.body.Arabic_Familyname,
      Arabic_Motherfirstname:req.body.Arabic_Motherfirstname,
      Arabic_Motherfathername:req.body.Arabic_Motherfathername,
      Arabic_Mothergrandfathername:req.body.Arabic_Mothergrandfathername,
      Arabic_Motherfamilyname:req.body.Arabic_Motherfamilyname,
      Nationality_Id:req.body.Nationality_Id,
      Religion_Id:req.body.Religion_Id,
      Socialstatus_Id:req.body.Socialstatus_Id,
      Regdoctype_Id:req.body.Regdoctype_Id,
      Certification_Type_Id:req.body.Certification_Type_Id,
      CertificationMber:req.body.CertificationMber,
      Certification_File_Number:req.body.Certification_File_Number,
      Certification_Issuance_Date:req.body.Certification_Issuance_Date,
      Mothernationality_Id:req.body.Mothernationality_Id,
      Fathernationality_Id:req.body.Nationality_Id
   };
    personal.add_personal_model(personal_c,function(result){
      var members_c={
        KinshipId:3,
        PersonalId:result.id,
        FamilyId:req.body.FamilyId
      };
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
          OfficeId:id_office,
          blood_type:req.body.blood_type
        }
        birth.add_birth(birth_c,function(result2){
          res.redirect('/birth?q='+req.body.query);
        });
      });
    });  
  });
  router.post('/birth/delete_birth',function (req, res) {
    birth.delete_birth(req.body,function(result){
      res.redirect('/birth?q='+req.body.query);
    });
  });
  router.post('/birth/edit_birth',function (req, res) {
    
    id = req.body.PersonalId
    q=req.body.query;
    father_office=req.body.OfficeId;
    offic_id=req.body.OfficeIdw;
    if(req.body.newborn_reporting==2){
      req.body.OfficeId=offic_id;
    }
    delete req.body.OfficeIdw;
    delete req.body.PersonalId;
    delete req.body.query;
    birth.edit_birth(req.body,id,function(result){
      res.redirect('/birth?q='+q);
    });
  });
  
  router.get('/birth/get_birth/:id',function (req, res) {
    birth.get_birth(req.params.id,function(result){
      if(result){
        birth.get_birth_office(result.OfficeId,function(offic){
          birth.get_father_offece(req.params.id,function(foffice){
            obj={
              result:result,
              offic:offic,
              foffice:foffice.Family.OfficeId
            }
            res.send(obj);
          });
        });
      }else{
        res.send(false);
      }
    });
  });
}