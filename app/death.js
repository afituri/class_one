var models = require("../models");
exports.death_mgr = {

  add_death: function(body,cb){
    models.Death.create(body).then(function(result) {
      cb(result);
    });
  },
  updet_personal: function (id, cb) {
    models.Personal.update({
      Is_Alive:2
    },{
      where: {
        id: id
      }
    })
    .then(function (result) {
      cb(result);
    });
  },
  get_death: function (id, cb) {
    models.Death.findAll({
        where: {
          status: 1,
          PersonalId: id,

        }
      })
      .then(function (result) {
        cb(result);
    });
  },
};