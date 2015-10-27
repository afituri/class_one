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

  edit_personal_model :function(body,id,cb){
     models.Personal.update(body, {
    where: {
      id:id
    }
  }).then(function(result) {
      cb(result);
    });

  },


  edit_Members:function(body,id,cb){
     models.Member.update(body, {
    where: {
      PersonalId:id
    }
  }).then(function(result) {
      cb(result);
    });

  },


  get_personal_only : function(id,cb){
     models.Personal.findAndCountAll({
      where: {
        id: id
      }
    }).then(function(personal) {
      models.Member.findAndCountAll({
      where: {
        PersonalId: id
      }
    }).then(function(member) {
      cb({personal:personal.rows,member:member.rows});
    });
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
    models.Member.create(body).then(function(result) {
      cb(result);
    });
  },

  delete_personal: function (id, cb) {
    models.Personal.destroy({
      where: {
        id: id
      }
    }).then(function (result) {
      console.log(result);
      cb(true);
    }).catch(function (err) {
      console.log(err);
      cb(false);
    });
  },
   delete_Members: function (id, cb) {
    models.Member.destroy({
      where: {
        PersonalId: id
      }
    }).then(function (result) {
      console.log(result);
      cb(true);
    }).catch(function (err) {
      console.log(err);
      cb(false);
    });
  }

};