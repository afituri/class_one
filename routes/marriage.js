var models = require("../models");
var personal = require("../app/personal")
  .personal_mgr
module.exports = function (router) {

  router.get('/marriage', function(req, res) {
    res.render('marriage', {
      title : "افراد الاسرة" 
    });
  });

  router.post('/searchMarriage', function(req, res) {
    console.log(req.body);
    if(req.body.searchVal){
      var value={val:req.body.searchVal,gender:1}
    }else{
      var value={val:req.body.searchVal_F,gender:2}
    }
    personal.get_personal_by_Registrynumber(value,function (personal){
      var rel = {result : personal[0] ,stat : true}; 
      console.log(rel);
      res.send(rel);
    });
    // res.send(constants.social_status);
  });

}