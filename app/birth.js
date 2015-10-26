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
  get_birth_office : function(id,cb){
    models.sequelize.query('SELECT `o`.`id` AS office ,`b`.`id` AS branche , `r`.`id` AS region FROM `Offices` o , `Branches` b , `Regions` r WHERE `o`.`BranchId` = `b`.`id` AND `b`.`RegionId` = `r`.`id` AND `o`.`id` =?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result[0]);
    });
  },
  get_father_offece: function(id,cb){
    models.Member.findOne({
      include: [{
        model: models.Family,
        where: {
          status: 1,
        }
      },{
        model: models.Personal,
        where: {
          status: 1,
          id:id
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