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
  get_suns: function (id,cb) {
    models.sequelize.query('SELECT * FROM `Personals` WHERE `Motherperson_Id`=?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result);
    });
  },
  get_Personal: function (id,cb) {
    models.sequelize.query('SELECT * FROM `Personals` WHERE `id`=?', { 
      replacements: [id]
    }).then(function (result) {
      cb(result);
    });
  },
  add_divorce : function(body,cb){
    models.Divorces.create(body).then(function(result) {
      cb(result);
    });
  },
};