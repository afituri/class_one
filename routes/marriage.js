var models = require("../models");
module.exports = function (router) {

  router.get('/marriage', function (req, res) {
    res.render('marriage', {
      title : "افراد الاسرة" 
    });
  });

}