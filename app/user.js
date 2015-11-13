var models = require("../models"),
    user_helpers = require("./user_helpers");
exports.user_mgr = {
   /* get all users*/
  get_users : function(cb){
    models.User.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(users) {
      cb(users)
    });
  },

  get_user : function(id,cb){
    models.User.findOne({
      where: {
        status: 1,
        id:id
      }
    }).then(function(user) {
      cb(user);
    });
  },
   /* add new region*/
  add_user : function(body,cb){
    user_helpers.add_user(body,function(result) {
      if(result) {
        cb('/user?msg=1');
      } else {
        cb('/user?msg=2');
      }
    });
  },
  update_user: function(body,cb){
    user_helpers.updateUser(body,function(result) {
      if(result) {
        cb('/user?msg=3');
      } else {
        cb('/user?msg=4');
      }
    });
  },
  delete_user: function(id,cb){
    models.User.destroy({
      where: {
        id: id
      }
    }).then(function(result){
      if(result) {
        cb('/user?msg=5');
      } else {
        cb('/user?msg=6');
      }
    });
  },
};