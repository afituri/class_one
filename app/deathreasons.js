var models = require("../models");
exports.deathreasons_mgr = {
  /* get  all deathreasons */
  get_deathreasons : function(cb){
    models.Deathreasons.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      cb(result);
    });
  },
   /* add new deathreasons*/
  add_deathreasons : function(body,cb){
    models.Deathreasons.create(body).then(function(result) {
      cb('/deathreasons?msg=3');
    });
  },
  /* update deathreasons*/
  edit_deathreasons : function(body,cb){
    models.Deathreasons.update({
      deathreasons_name: body.region_name
    },{
      where:{
        id:body.id
      }
    }).then(function(result){
      cb('/deathreasons?msg=4');
    });
  },
  /*delete deathreasons  */
  delete_deathreasons : function(body,cb){
    models.Deathreasons.destroy({
      where:{
        id:body.id
      }
    }).then(function(result){
      cb('/deathreasons?msg=1');
    }).catch(function(err){
      cb('/deathreasons?msg=2');
    });
  },




};