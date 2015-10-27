var models = require("../models");
exports.member_mgr = {
  get_family_members : function(id,cb){
    models.Member.findAll({
      include: [{
        model: models.Family,
        where: {
          status: 1,
          Registrynumber:id
        }
      },{
        model: models.Personal,
        where: {
          status: 1
        },
        include: [{
          model: models.Country,
          as: 'Nationality',
          where: {
            status: 1,
          }
        }]
      },{
        model: models.Kinship,
        where: {
          status: 1
        }
      }]
    }).then(function(result) {
      cb(result);
    });
  },
  get_member : function(id,cb){
    models.Member.findAll({
      include: [{
        model: models.Family,
        where: {
          status: 1,
        },
        include:[{
          model: models.Office,
          where: {
            status: 1,
          },
        }]
      },{
        model: models.Personal,
        where: {
          status: 1,
          id:id
        },
        include: [{
          model: models.Country,
          as: 'Nationality',
          where: {
            status: 1,
          }
        }]
      },{
        model: models.Kinship,
        where: {
          status: 1
        }
      }]
    }).then(function(result) {
      cb(result);
    });
  },
  get_member_children : function(id,g,cb){
    if(g==1){
      var objwhere={
        where:{
          status:1,
          Fatherperson_Id:id,
        }
      }  
    }else{
      var objwhere={
        where:{
          status:1,
          Motherperson_Id:id,
        }
      }
    }
    
    models.Personal.findAndCountAll(objwhere).then(function(result) {
      cb(result.count);
    });
  },
  add_members : function(body,cb){
    models.Member.create(body).then(function(result) {
      cb(result);
    });
  },

};