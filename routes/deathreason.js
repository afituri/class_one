var models = require("../models");
var deathreason = require("../app/deathreason").deathreason_mgr;
module.exports = function (router) {
  /* GET deathreasons page. */
  router.get('/deathreason', function(req, res) {
    deathreason.get_deathreason(function(result){
      res.render('deathreason', { 
        title: 'اسباب الوفيات', 
        deathreasons:result.rows, 
      });
    })
  });

  /* Add deathreasons page. */
  router.post('/deathreason/new_deathreason', function(req, res) {
    deathreason.add_deathreason(req.body, function (result) {
      res.redirect(result);
    });
  });

  /* Edit deathreasons page. */
  router.post('/deathreason/edit_deathreason', function(req, res) {
    deathreason.update_deathreason(req.body, function(result){
      res.redirect(result);
    })
  });

  /* Delete deathreasons page. */
  router.post('/deathreason/delete_deathreason', function(req, res) {
    deathreason.delete_deathreason(req.body,function(result){
      res.redirect(result);
    })
  });

}
