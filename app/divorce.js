var models = require("../models");
exports.divorce_mgr = {
  get_divorce: function (id,cb) {
    models.Divorce.findAll({
      where: {
        status: 1,
          husband_family_Id :id
      },
        include: [{
          model: models.Personal,
          as :'Husband',
          where: {
            status: 1,
          }
        },{
          model: models.Personal,
          as :'Wife',
            where: {
              status: 1
            } 
        }]
    }).then(function(result) {
      cb(result);
    });
  },
  get_divorces: function (id,cb) {
    models.Divorce.findAll({
      where: {
        status: 1,
          id:id
      },
    }).then(function(result) {
      cb(result);
    });
  },

  get_wife: function (id,cb) {
    models.Member.findAll({
      where: {
        status: 1,
        KinshipId : 2
      },
      include: [{
        model: models.Family,
        where: {
          status: 1,
          id:id
        }
      },{
        model: models.Personal,
        where: {
          status: 1,
        }
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
  get_father: function (id,cb) {
    console.log(id);
    models.Member.findAll({
      where: {
        status: 1,
        KinshipId :1
      },
      include: [{
        model: models.Family,
        where: {
          status: 1,
          id:id
        }
      },{
        model: models.Personal,
        where: {
          status: 1,
        }
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
  get_suns: function (id, cb) {
    models.Personal.findAll({
      where: {
        status: 1,
        Motherperson_Id : id
      }
    }).then(function (suns) {
      cb(suns);
    });
  },
  get_Personal: function (id, cb) {
    models.Personal.findAll({
      where: {
        status: 1,
        id: id
      }
    }).then(function (Personals) {
      cb(Personals);
    });
  },
  updet_wife_fmly: function(id,cb){
    var FamId;
    models.sequelize.query('SELECT `from_familyId` FROM `Members` WHERE `PersonalId`=?', { 
      replacements: [id]
    }).then(function (result) {
      FamId =  result[0][0].from_familyId;
        models.sequelize.query('UPDATE `Members` SET `FamilyId`= ?  WHERE `PersonalId` = ? ', { 
      replacements: [FamId,id]
      }).then(function (result1) {
        cb(result1);
      });
    });
  },
  add_divorce: function(body,cb){
    models.Divorce.create(body).then(function(result) {
      cb(result);
    });
  },
  add_family: function (body,cb) {
    models.Family.create(body).then(function (result) {
        cb(result);
      }).catch(function (err) {
        cb(false);
      });
  },
  updet_wife_new :function (body,id,cb) {
    models.Member.update(body,{
      where:{
        PersonalId:id
      }
    }).then(function (result) {
        cb(result);
      }).catch(function (err) {
        cb(false);
      });
  },
  updet_wife_sons :function (son,id,cb) {
    models.Member.update({FamilyId:id},{
      where:{
        PersonalId:{
          $in:son
        }
      }
    }).then(function (result) {
        cb(result);
      }).catch(function (err) {
        cb(false);
      });
  },
  edit_divorce : function(body,id,cb){
    models.Divorce.update(body, {
    where: {
      id:id
    }
  }).then(function(result) {
      cb(result);
      console.log(result);
    });
  },
};