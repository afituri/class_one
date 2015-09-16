var models = require("../models");
exports.branch_mgr = {
  /* get  all branchs */
  get_branch : function(cb){
    models.Branch.findAndCountAll({
      where: {
        status: 1
      },
      order: '`id` ASC',
      include :[{
        model: models.Region,
        where: { status: 1 }
      }]
    }).then(function(result) {
      models.Region.findAll({
        where: {
          status: 1
        }
      }).then(function(regions){
        cb({branch:result,regions:regions});
      })
    });
  },




};