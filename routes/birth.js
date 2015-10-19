var models = require("../models");
var region = require('../app/region').region_mgr;
var country = require('../app/country').country_mgr;
var member = require('../app/member').member_mgr;
module.exports = function (router) {

  router.get('/birth/:id', function (req, res) {
    region.get_regions(function(result){
      country.get_country(function(countrys){
        member.get_family_members(req.params.id,function(fpersonals){
          res.render('birth', {
          title : "افراد الاسرة" ,regions:result.rows,countrys:countrys,personals:fpersonals
          });
        });
      });
    });
  });

  router.post('/birth/new_birth',function (req, res) {
    console.log(req.body);
  });
}