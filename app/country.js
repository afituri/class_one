var models = require("../models");
exports.country_mgr = {
  get_country: function (cb) {
    models.sequelize.query('select * from Countries', {
    }).then(function (result) {
      cb(result);
    });
  },

};
