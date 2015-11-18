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

   get_country_by_country_id: function (id,mid,cb) {
    models.Country.findAll({
      where: {
        status: 1,
        id : id
      }
    }).then(function (father_nat) {
      models.Country.findAll({
      where: {
        status: 1,
        id : mid
      }
    }).then(function (mother_nat) {
      cb({father_nat:father_nat,mother_nat:mother_nat});
    });
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
