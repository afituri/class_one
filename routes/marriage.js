var models = require("../models");
var personal = require("../app/personal")
  .personal_mgr
var marriage = require("../app/marriage")
  .marriage_mgr
var city = require("../app/city")
  .city_mgr  
module.exports = function (router) {

  router.get('/marriage', function(req, res) {
    city.get_city_all(function(result){
      res.render('marriage', {
        title : "واقعة زواج",citys:result.rows
      });
    });
  });

  router.post('/searchMarriage', function(req, res) {
    if(req.body.searchVal){
      var value={val:req.body.searchVal,gender:1}
    }else{
      var value={val:req.body.searchVal_F,gender:2}
    }
    personal.get_personal_by_Registrynumber(value,function (personal){
      var rel = {result : personal ,stat : true}; 
      res.send(rel);
    });
  });

  router.post('/add_new_marriage', function(req, res) {
    if(req.body.Socialstatus_Id == 2)
    {
      marriage.update_member_wife(req.body, function (result) {
          marriage.add_new_marriage(req.body, function (result) {
            res.send(result);
          });
        });

    }else{
      marriage.add_family(req.body, function (result) {
        marriage.update_member(req.body,result, function (result) {
          marriage.add_new_marriage(req.body, function (result) {
            res.send(result);
          });
        });
      });
    }
  }); 

  router.get('/marriage/marriages', function(req, res) {
    marriage.get_marriage(function (result) {
      city.get_city_all(function(city){
        res.render('view_marriage', {
          title : "عرض واقعات الزواج" ,marriages:result,citys:city.rows
        });
      });
    });  
  });

  router.post('/update_marriage', function(req, res) {
    marriage.edit_marriage(req.body, function (result) {
      res.send(result);
    });
  });
}