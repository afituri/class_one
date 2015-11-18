var models = require("../models");
var user_helpers = require('../app/user_helpers');
module.exports = function (router) {
  /* GET cityes page. */
  router.get('/city',user_helpers.isLogin, function (req, res) {
    models.City.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include: [{
        model: models.Country,
        where: {
          status: 1
        }
      }]
    }).then(function (result) {
      models.Country.findAll({
        where: {
          status: 1
        }
      }).then(function (countries) {
          res.render('city', {
          title: 'مدينة الميلاد',
          cities: result.rows,
          countries: countries,
          collapse_one: 'collapse in', 
          active_one_eight: 'active',
          name: req.session.name
        });
      })
    });
  });

  /* Get city by ID */
  router.get('/city/get_city/:id',user_helpers.isLogin, function (req, res) {
    models.City.findAll({
      where: {
        status: 1,
        CountryId: req.params.id
      }
    }).then(function (cities) {
      res.send(cities);
    })
  });

  /* Add cityes page. */
  router.post('/city/new_city',user_helpers.isLogin, function (req, res) {
    models.City.create(req.body).then(function (result) {
      res.redirect("/city");
    });
  });

  /* Edit cityes page. */
  router.post('/city/edit_city',user_helpers.isLogin, function (req, res) {
    models.City.update({
      city_name: req.body.city_name,
      CountryId: req.body.CountryId
    },{
      where: {
        id: req.body.id
      }
    }).then(function (result) {
      res.redirect('/city');
    });
  });

  /* Delete cityes page. */
  router.post('/city/delete_city',user_helpers.isLogin, function (req, res) {
    models.City.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (result) {
      res.redirect('/city?msg=1');
    }).catch(function (err) {
      res.redirect('/city?msg=2');
    });
  });
}
