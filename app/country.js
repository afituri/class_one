var models = require("../models");
exports.country_mgr = {
  get_country: function (cb) {
    models.sequelize.query('select * from Countries where id=?', {
    }).then(function (result) {
    	cb(result);
    });


  },





  };
