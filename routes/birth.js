var models = require("../models");
module.exports = function (router) {

  router.get('/birth', function (req, res) {
    res.render('birth', {
      title : "افراد الاسرة" 
    });
  });

}