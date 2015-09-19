var models = require("../models");
exports.region_mgr = {
  /* get  all regions */
  get_regions : function(cb){
    models.Region.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      cb(result);
    });
  },
   /* add new region*/
  add_region : function(body,cb){
    models.Region.create(body).then(function(result) {
      cb('/region?msg=3');
    });
  },
  /* update region*/
  edit_region : function(body,cb){
    models.Region.update({
      region_name: body.region_name
    },{
      where:{
        id:body.id
      }
    }).then(function(result){
      cb('/region?msg=4');
    });
  },
  /*delete region  */
  delete_region : function(body,cb){
    models.Region.destroy({
      where:{
        id:body.id
      }
    }).then(function(result){
      cb('/region?msg=1');
    }).catch(function(err){
      cb('/region?msg=2');
    });
  },




};