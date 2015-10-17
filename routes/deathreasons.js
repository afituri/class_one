var models = require("../models");
var deathreasons = require("../app/deathreasons")
  .deathreasons_mgr;
module.exports = function (router) {

  /* GET deathreasonss page. */
  router.get('/deathreasons', function (req, res) {
    deathreasons.get_deathreasons(function (result) {
      res.render('deathreasons', {
        title: 'أسباب الوفاة - الأمراض',
        deathreasonss: result.rows,
        collapse_one: 'collapse in', 
        active_one_five: 'active'
      });
    })
  });

  /* Add deathreasonss page. */
  router.post('/deathreasons/new_deathreasons', function (req, res) {
    deathreasons.add_deathreasons(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Edit deathreasonss page. */
  router.post('/deathreasons/edit_deathreasons', function (req, res) {
    deathreasons.update_deathreasons(req.body,function (result) {
      res.redirect(result);
    })
  });

  /* Delete deathreasonss page. */
  router.post('/deathreasons/delete_deathreasons', function (req, res) {
    deathreasons.delete_deathreasons(req.body,function (result) {
      res.redirect(result);
    })
  });
}
