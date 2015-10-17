var models = require("../models");
var constants = require("../data/constants.json");
var country = require("../app/country")
  .country_mgr;
var family = require("../app/family")
  .family_mgr;
module.exports = function (router) {
  /* GET personals page. */
  router.get('/personal', function (req, res) {
    /*country.get_country(function(result){
      console.log(result);*/

     /* res.render('personal', {
        title: 'أفراد الأسرة',
        social: constants,
      });*/
    //});

  family.get_family(function (result) {
      res.render('personal', { 
        title: 'أفراد الأسرة', 
        familys: result.result.rows,
        offices: result.offices,
         social: constants,
      });
    });
  });

  /* Add personals page. */
  router.post('/personal/new_personal', function (req, res) {
    delete req.body.personal
    models.Personal.create(req.body).then(function (result) {
      res.redirect("/personal");
    });
  });


}
