var models = require("../models");
exports.divorce_mgr = {
  get_wife: function (id,cb) {
    models.sequelize.query('SELECT * FROM Personals as p , Families as f ,Kinships as k ,Members as m WHERE p.id = m.PersonalId and m.FamilyId = f.id and m.KinshipId = 2 and m.KinshipId = k.id  and f.id =?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result);
    });
  },
  get_father: function (id,cb) {
    models.sequelize.query('SELECT * FROM Personals as p , Families as f ,Kinships as k ,Members as m WHERE p.id = m.PersonalId and m.FamilyId = f.id and m.KinshipId = 1 and m.KinshipId = k.id  and f.id =?', { 
      replacements: [id]
    }).then(function (result) {
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
      console.log(FamId);
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
  get_family_by_registry_number : function(reg,cb){
    var reg=reg+"%";
    models.sequelize.query('select *,f.id as fid from Families as f,Offices as o where  f.Registrynumber LIKE ? and o.id=f.OfficeId', {
    replacements:[reg]
    }).then(function (result) {
      console.log(result[0]);
      cb(result[0]);
    });
  },
};