var models = require("../models");
exports.personal_mgr = {

  get_personal : function(id,cb){
    models.sequelize.query('select *,p.id as pid,k.id as kid from Members  as m,Personals as p,Countries as c,Kinships as k where p.id =m.PersonalId and k.id = m.KinshipId  and c.id=p.Nationality_Id and  p.id in (select PersonalId from Members where FamilyId=?)', {
      replacements: [id]
    })
    .then(function (result) {
      cb(result);
   });
  },

  add_personal : function(body,cb){
    models.sequelize.query('INSERT INTO `Personals` SET ?', {
      replacements: [body]
    })
    .then(function (result) {
      console.log(result);
      cb(result);
   });
  },
  add_personal_model : function(body,cb){
    models.Personal.create(body).then(function(result) {
      cb(result);
    });
  },
  get_personal_by_Registrynumber : function(id,cb){
    models.Member.findAll({
      include: [{
        model: models.Family,
        where: {
          status: 1,
          Registrynumber:id.val
        }
      },{
        model: models.Personal,
        where: {
          status: 1,
          Gender:id.gender
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

  insert_Members:function(body,cb){
    models.sequelize.query('INSERT INTO `Members` SET ?', {
      replacements: [body]
    })
    .then(function (result) {
      console.log(result);
      cb(result);
   });
  },

  delete_personal: function (id, cb) {
    models.Personal.destroy({
      where: {
        id: id
      }
    }).then(function (result) {
      cb(true);
    }).catch(function (err) {
      cb(false);
    });
  }





};