var models = require("../models");
var constants = require("../data/constants.json");
module.exports = function (router) {
  /* GET personals page. */
  router.get('/personal', function (req, res) {
    models.Member.findAndCountAll({
      where: {
        status: 1
      },
      include: [{
        model: models.Personal,
        where: {
          status: 1
        },
        include: [{
          model: models.Country,
          as: 'Nationality',
          where: {
            status: 1
          },
        }]
      } , {
        model: models.Kinship,
        where: {
          status: 1
        },
      }]
    }).then(function (result) {
      models.Country.findAndCountAll({
        where: {
          status: 1
        }
      }).then(function (Country) {
        res.render('personal', {
        title: 'أفراد الأسرة',
        personals: result.rows,
        social: constants,
        country: Country
        });
      });
    });
  });

  /* Add personals page. */
  router.post('/personal/new_personal', function (req, res) {
    delete req.body.personal
    models.Personal.create(req.body)
      .then(function (result) {
        res.redirect("/personal");
      });
  });


}
