var models = require("../models");
exports.office_mgr = {
  // get office
  get_office: function (cb) {
    models.Office.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include: [{
        model: models.Branch,
        where: {
          status: 1
        },
        include: [{
          model: models.Region,
          where: {
            status: 1
          }
        }]
      },{
        model: models.Manucipality,
        where: {
          status: 1
        }
      }]
    }).then(function (offices) {
      models.Region.findAll({
        where: {
          status: 1
        }
      }).then(function (regions) {
        models.Branch.findAll({
          where: {
            status: 1
          }
        }).then(function (branches) {
          models.Manucipality.findAll({
            where: {
              status: 1
            }
          }).then(function (manucipalitys) {
            cb({
              offices: offices,
              regions: regions,
              branches: branches,
              manucipalitys: manucipalitys
            });
          });
        });
      });
    });
  },
  // add new office
  add_office: function (body) {
    models.Office.create(body)
    .then(function (result) {
      cb("/office?msg=3");
    });
  },
  // update office
  update_office: function (body, cb) {
    models.Office.update({
      office_name: body.office_name,
      BranchId: body.BranchId,
      ManucipalityId: body.ManucipalityId,
      latitude: body.latitude,
      longitude: body.longitude
    },{
      where: {
        id: body.id
      }
    }).then(function (result) {
      cb('/office?msg=4');
    });
  },
  // delete office
  delete_office: function (body, cb) {
    models.Office.destroy({
      where: {
        id: body.id
      }
    }).then(function (result) {
      cb('/Office?msg=1');
    }).catch(function (err) {
      cb('/Office?msg=2');
    });
  }
};
