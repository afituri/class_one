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
   /* add new region*/
  add_user : function(body,cb){
    user_helpers.add_user(body,function(result)) {
      if(result) {
        cb('/user?msg=1');
      } else {
        cb('/user?msg=3');
      }
    }
  }
};