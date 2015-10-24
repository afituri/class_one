var models = require("../models");
exports.marriage_mgr = {

  add_family : function(body,cb){
    models.Family.create(body).then(function (result) {
      cb(result.id);
    });
  },

  update_member : function (body,id,cb){
    models.Member.update({
      FamilyId:id,
      }, {
        where: {
          PersonalId: body.husband_personal_Id
        }
      })
      .then(function (result) {
        cb(result);
    });
  },

  add_new_marriage : function(body,cb){
    models.Marriage.create(body).then(function (result) {
      cb(true);
    }).catch(function (err) {
      cb(false);
    });
  },

};