var models = require("../models");
exports.deathreason_mgr = {
  // get all deathreasons
  get_deathreason: function (cb) {
    models.deathreason.findAndCountAll({
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
    models.deathreason.create(body)
      .then(function (result) {
        cb("/deathreason?msg=3");
      });
  },
  // update deathreason
  update_deathreason: function (body, cb) {
    models.deathreason.update({
        deathreason_name: body.deathreason_name
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
    models.deathreason.destroy({
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
