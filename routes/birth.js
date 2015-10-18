var models = require("../models");
var region = require('../app/region').region_mgr;
var country = require('../app/country').country_mgr;
module.exports = function (router) {

  router.get('/birth', function (req, res) {
    region.get_regions(function(result){
      country.get_country(function(countrys){
        res.render('birth', {
        title : "افراد الاسرة" ,regions:result.rows,countrys:countrys
        });
      });
    });
  });

}