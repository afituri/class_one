var models = require("../models");
exports.personal_mgr = {
   get_personal : function(id,cb){
    models.sequelize.query('select * from Personals as p,Countries as c where  c.id=p.Nationality_Id and  p.id in (select PersonalId from Members where FamilyId=?)', {
      replacements: [id]
    })
    .then(function (result) {
      cb(result);
   });
  },

  get_personal_by_Registrynumber : function(id,cb){
    models.sequelize.query('select * from Personals as p,Families as f,Members as m,Kinships as k where  m.PersonalId=p.id and  m.FamilyId=f.id and m.KinshipId=k.id and f.Registrynumber=? and p.Gender=?', {
      replacements: [id.val, id.gender]
    })
    .then(function (result) {	
      cb(result);
   });
  }

  add_personal : function(body,cb){
    models.Personal.create(body).then(function(result) {
      cb(result);
    });
  },

};