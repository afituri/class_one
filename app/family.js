var models = require("../models");
exports.family_mgr = {
  /* get  all families */
  get_personal_by_family_id : function(id,cb){
    models.sequelize.query('select *,p.id as pid from Personals as p, Members as m where m.FamilyId=? and m.PersonalId=p.id', {
      replacements:[id]
    }).then(function (result) {
      cb(result[0]);
    });
  },
  get_family_by_id : function(id,cb){
    models.Family.findAndCountAll({
        where: {
          status: 1,
          id:id
        },
        order: '`id` ASC',
        include: [{
          model: models.Office,
          where: {
            status: 1
          }
      }]
      })
      .then(function (result) {
        models.Office.findAll({
            where: {
              status: 1
            }
          })
          .then(function (offices) {
            cb({result:result,offices:offices})
          });
      });
    },


  get_family : function(cb){
    models.Family.findAndCountAll({
        where: {
          status: 1
        },
        order: '`id` ASC',
        include: [{
          model: models.Office,
          where: {
            status: 1
          }
      }]
      })
      .then(function (result) {
        models.Office.findAll({
            where: {
              status: 1
            }
          })
          .then(function (offices) {
            cb({result:result,offices:offices})
          });
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
  


   /* add new family*/
  add_family: function (body,cb) {
    models.Family.create(body).then(function (result) {
        cb(true);
      }).catch(function (err) {
        cb(false);
      });
  },


  /* update family*/
  edit_family : function(body,cb){

    models.Family.update({
      Registrynumber:body.Registrynumber,
      Recordnumber:body.Recordnumber,
      Autogenerated_Id:body.Autogenerated_Id,
      FamilyRecordDate:body.FamilyRecordDate,
      Is_Closed:body.Is_Closed,
      FamilyType:body.FamilyType,
      OfficeId:body.OfficeId,
      }, {
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/family?msg=11');
      });
  },


  /*delete family  */
  delete_family : function(body,cb){
    models.Family.destroy({
        where: {
          id: body.id
        }
      })
    // cb its same return  ruslut at page family router
      .then(function (result) {
        cb('/family?msg=1');
      })
      .catch(function (err) {
        cb('/family?msg=2');
      });
  },



};