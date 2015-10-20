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

  add_personal : function(body,cb){
    models.Personal.create(body).then(function(result) {
      cb(result);
    });
  },
  
};