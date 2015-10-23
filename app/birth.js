var models = require("../models");
exports.birth_mgr = {
  get_birth : function(id,cb){
    models.Birth.findOne({
      where:{
        PersonalId:id
      },
      include:[{
        model: models.Personal,
        where: {
          status: 1
        },
      }]
    }).then(function(result) {
      cb(result);
    });
  },
  add_birth : function(body,cb){
    models.Birth.create(body).then(function(result) {
      cb(result);
    });
  },
  edit_birth : function(body,id,cb){
    models.Birth.update(body, {
    where: {
      PersonalId:id
    }
  }).then(function(result) {
      cb(result);
    });
  },
  delete_birth : function(body,cb){
    models.Birth.destroy({
      where: {
        PersonalId: body.idp
      }
    }).then(function(result){
      models.Member.destroy({
        where: {
          PersonalId: body.idp
        }
      }).then(function(result){
        models.Personal.destroy({
          where: {
            id: body.idp
          }
        }).then(function(result){
          cb(true)
        });
      });
    });
  },
};