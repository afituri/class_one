var models = require("../models");
var family = require("../app/family")
  .family_mgr;
var divorce = require("../app/divorce")
  .divorce_mgr;
var office = require("../app/office")
  .office_mgr;
var country = require('../app/country').country_mgr;
var region = require('../app/region').region_mgr;
var birth = require('../app/birth').birth_mgr;
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /*--------------*/
  router.get('/divorce',user_helpers.isLogin, function (req, res) {
    family.get_family(function (result) {
      region.get_regions(function(result1) {
        country.get_country(function(countrys){
          res.render('divorce', {
            title : "واقعة الطﻻق",
            collapse_three: 'in', 
            active_three_three: 'active',
            familys: result.result.rows,
            regions:result1.rows,
            countrys:countrys,
            name: req.session.name
          });
        })  
      })
    });  
  });
  /*------------*/
  var familyId;
  router.get('/divorce/:id',user_helpers.isLogin, function (req, res) {
    familyId=req.params.id;
    divorce.get_wife(familyId,function (wife){ 
     res.send(wife);
    })
  });
  /*-------------*/
  router.get('/divorce/father/:id',user_helpers.isLogin, function (req, res) {
    divorce.get_father(req.params.id,function (father){
      res.send(father);
    })
  });
 
  /*-----------*/
   /*-------------*/
  router.get('/editdivorce/:id', function (req, res) {
    divorce.get_divorce(req.params.id,function (result){
      region.get_regions(function(region) {
        country.get_country(function(countrys){
          res.render('editdivorce', {
            title : "تعديل واقعة الطﻻق",
            regions:region.rows,
            result:result,
            countrys:countrys,
            name: req.session.name
          });
        })  
      })
    })
  });
  /*-----------*/
  router.get('/divorce/divorce_data/:id', function (req, res) {
      divorce.get_divorces(req.params.id,function (divorce){
        console.log(divorce[0].OfficeId)
        var idOf =divorce[0].OfficeId;
        birth.get_birth_office(idOf,function(offic){
          obj = {
            divorce:divorce,
            offic:offic,
          }
        res.send(obj);
        // console.log(obj);
       })  
     })
  });
  /*============*/
    router.post('/divorce/edit_divorce',function (req, res) {
      console.log(req.body);
    id = req.body.id;
    delete req.body.id;
    divorce.edit_divorce(req.body,id,function(result){
      res.redirect('/divorce');
    });
  });
  /*-----------*/
  router.get('/divorce/search_family/:id',user_helpers.isLogin, function (req, res) {
      family.get_family_by_registry_number(req.params.id,function (family){
        res.send(family[0]);
     })
  });
  /*============*/
  var sunId;
  router.get('/divorce/suns/:id',user_helpers.isLogin, function (req, res) {
    sunId=req.params.id;
      divorce.get_suns(sunId,function (suns){
        res.send(suns);
     })
  });
  /*===============*/
  router.get('/divorce/Personal/:id',user_helpers.isLogin, function (req, res) {
    divorce.get_Personal(req.params.id,function (per){
      res.send(per[0]);
    })
  });
  /*==================*/
  router.post('/divorce/new_divorce',user_helpers.isLogin, function (req, res) {
    if(req.body.wife_bt_family == '1'){
      wife_personal_Id = req.body.waif_name;
      divorce.updet_wife_fmly(wife_personal_Id,function(result){
      });
    }
    else{

        var new_family = {
        OfficeId : req.body.officeId,  
        Registrynumber : req.body.Registrynumber,
        Recordnumber : req.body.Recordnumber,
        FamilyRecordDate : req.body.FamilyRecordDate,
        Autogenerated_Id : req.body.Autogenerated_Id,
        Is_Closed : req.body.Is_Closed,
        FamilyType : req.body.FamilyType
      };
      divorce.add_family(new_family,function(result){
        divorce.updet_wife_new({FamilyId:result.id,KinshipId:1},req.body.waif_name,function(result1){
          if(req.body.wife_custody == 'on')
          {
            divorce.updet_wife_sons(req.body.son,result.id,function(result2){
            });
          }     
        });
      });
    }
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
        husband_family_Id : req.body.husband_family_Id,
        husband_personal_Id : req.body.father_name,
        wife_personal_Id : req.body.waif_name,
        wife_bt_family : req.body.wife_bt_family,
        OfficeId : req.body.officeId,
        divorce_place : req.body.divorce_place,
        divorce_date : req.body.divorce_date,
        contract_number : req.body.contract_divorce_number,
        record_divorce_nu : req.body.record_divorce_number,
        inform_date : req.body.inform_date,
        CityId : req.body.city_Id,
        divorce_type : req.body.divorce_type
      };
      divorce.add_divorce(divorce_c,function(result2){
        res.redirect('/divorce');  
      });
  });
}