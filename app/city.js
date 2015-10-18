var models = require("../models");
exports.city_mgr = {
  get_city: function (id,cb) {
    models.sequelize.query('select * from Cities where CountryId=?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result);
    });
  },

};