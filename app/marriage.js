var models = require("../models");
exports.marriage_mgr = {

  get_marriage: function (cb) {
    models.Marriage.findAll({
      include: [{
        model: models.Family,
        where: {
          status: 1,
        }
      }],
        where: {
          status: 1,
        }
      })
      .then(function (result) {
        // console.log(result.rows[1].dataValues.id);
        // console.log(result.rows.length);
        cb(result);
    });
  },

  get_marriage_by_id: function (id,cb) {
    models.Marriage.findAll({
      include: [{
        model: models.Family,
        where: {
          status: 1,
        }
      }],
        where: {
          status: 1,
          husband_personal_Id:id
        }
      })
      .then(function (result) {
        // console.log(result.rows[1].dataValues.id);
        // console.log(result.rows.length);
        cb(result);
    });
  },

  add_family : function(body,cb){
    models.Family.create(body).then(function (result) {
      cb(result.id);
    });
  },

  update_member : function (body,id,cb){
    models.Member.update({
      FamilyId:id,
      leader:1,
      KinshipId:1,

      }, {
        where: {
          PersonalId: body.husband_personal_Id
        }
      })
      .then(function (result) {
        models.Member.update({
          FamilyId:id,
          leader:2,
          KinshipId:2,

          }, {
            where: {
              PersonalId: body.wife_personal_Id
            }
          })
          .then(function (result) {
            models.Personal.update({
              Socialstatus_Id:2,
              }, {
                where: {
                  id: body.husband_personal_Id
                }
              })
        .then(function (result) {
          models.Personal.update({
            Socialstatus_Id:2,
            }, {
              where: {
                id: body.wife_personal_Id
              }
            })
        .then(function (result) {
         cb(result);
      });
      });
        });
    });
  },

  update_member_wife : function (body,cb){
    models.Member.update({
      FamilyId:body.husband_family_Id,
      leader:2,
      KinshipId:2,

      }, {
        where: {
          PersonalId: body.wife_personal_Id
        }
      })
      .then(function (result) {
       models.Personal.update({
        Socialstatus_Id:2,
        }, {
          where: {
            id: body.wife_personal_Id
          }
        })
        .then(function (result) {
         cb(result);
      });
    });
  },

  add_new_marriage : function(body,cb){
    console.log(body);
    models.Marriage.create(body).then(function (result) {
      cb(true);
    }).catch(function (err) {
      cb(false);
    });
  },

  edit_marriage : function(body,cb){
    models.Marriage.update({
        marriage_type:body.marriage_type,
        marriage_date:body.marriage_date,
        inform_date:body.inform_date,
        marriage_place:body.marriage_place,
        contract_number:body.contract_number,
        record_marriage_nu:body.record_marriage_nu,
        CityId:body.CityId
        }, {
          where: {
            id: body.id,
          }
        })
        .then(function (result) {
          cb(true);
        }).catch(function (err) {
          cb(false);
    });
  },
};