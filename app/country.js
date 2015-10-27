var models = require("../models");
exports.country_mgr = {
  get_country: function (cb) {
    models.Country.findAll({
      where: {
        status: 1
      }
    }).then(function (result) {
      cb(result);
    });
  },

  get_Country_id: function (id,cb) {
    models.City.findAll({
      where: {
        id: id
      }
    }).then(function (result1) {
       models.Country.findAll({
        where: {
          id: result1[0].CountryId
        }
        }).then(function (result2) {
          cb({result1:result1,result2:result2});
      });
  });
  }
  

};
