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
module.exports = function (router) {
  /* GET personals page. */
  router.get('/personal/:id', function (req, res) {
    family.get_family(function (family) {
      personal.get_personal(req.params.id,function (personal){
        country.get_country(function (country){
          //console.log(personal[0]);
          //console.log(country);
          res.render('personal', { 
          title: 'أفراد الأسرة', 
          familys: family.result.rows,
          offices: family.offices,
          personal: personal[0],
          social: constants,
          country:country[0],
          });
        })
      })
    });
  });

 
  router.get('/personal/get_city/:id', function (req, res) {
    city.get_city(req.params.id,function  (result){
      res.send(result[0]);
    });
  });

  router.get('/get_country', function (req, res) {
    country.get_country(function  (result){
      res.send(result[0]);
    });
  });

  router.get('/get_social', function (req, res) {
    res.send(constants.social_status);
  });

  router.get('/get_religion', function (req, res) {
    res.send(constants.religion);
  });
  
   router.get('/get_registry/:reg', function (req, res) {
    console.log(req.params.reg);
    family.get_family_by_registry_number(req.params.reg,function(result){
     res.send(result);   
    })
    
  });

 
  

  /* Add personals page. */
  router.post('/personal/new_personal', function (req, res) {
    delete req.body.personal
    models.Personal.create(req.body).then(function (result) {
      res.redirect("/personal");
    });
  });


}
