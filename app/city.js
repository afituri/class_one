var models = require("../models");
exports.city_mgr = {
  get_city: function (id,cb) {
    models.sequelize.query('select * from Cities where CountryId=?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result);
    });
  },
  get_city_all: function (cb) {
    models.City.findAndCountAll({
        where: {
          status: 1
        }
      })
      .then(function (result) {
        cb(result);
      });
  },
};