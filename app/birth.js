var models = require("../models");
exports.birth_mgr = {

  add_birth : function(body,cb){
    models.Birth.create(body).then(function(result) {
      cb(result);
    });
  },

};