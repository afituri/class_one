var models = require("../models");
exports.deathreason_mgr = {
  // get all deathreasons
  get_deathreason: function (cb) {
    models.Deathreason.findAndCountAll({
        where: {
          status: 1
        }
      })
      .then(function (result) {
        cb(result);
      });
  },
  // add new deathreason
  add_deathreason: function (body, cb) {
    models.Deathreason.create(body)
      .then(function (result) {
        cb("/deathreason?msg=3");
      });
  },
  // update deathreason
  update_deathreason: function (body, cb) {
    models.Deathreason.update({
        reason_name: body.reason_name
      }, {
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/deathreason?msg=4');
      });
  },
  // delete deathreason
  delete_deathreason: function (body, cb) {
    models.Deathreason.destroy({
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/deathreason?msg=1');
      })
      .catch(function (err) {
        cb('/deathreason?msg=2');
      });
  },

};
