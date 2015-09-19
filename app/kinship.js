var models = require("../models");
exports.kinship_mgr = {
  /* get  all kinship */
  get_kinship: function (cb) {
    models.Kinship.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function (result) {
      cb(result);
    });
  },

  add_kinship: function (body, cb) {
    models.Kinship.create(body)
    .then(function (result) {
      cb("/kinship?msg=3");
    });
  },

  update_kinship: function (body, cb) {
    models.Kinship.update({
      kinship_name: body.kinship_name
    }, {
      where: {
        id: body.id
      }
    })
    .then(function (result) {
      cb('/kinship?msg=4');
    });
  },

  delete_kinship: function (body, cb) {
    models.Kinship.destroy({
      where: {
        id: body.id
      }
    }).then(function (result) {
      cb('/kinship?msg=1');
    }).catch(function (err) {
      cb('/kinship?msg=2');
    });
  },

};
