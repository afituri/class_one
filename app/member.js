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

};