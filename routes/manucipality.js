var models = require("../models");
module.exports = function (router) {

  /* GET Manucipalitys page. */
  router.get('/manucipality', function(req, res) {
    models.Manucipality.findAndCountAll({
      where: {
        status: 1
      }
    }).then(function(result) {
      res.render('manucipality', { title: 'البلديات', manucipalitys:result.rows});
    });
  });

  /* Add Manucipalitys page. */
  router.post('/manucipality/new_manucipality', function(req, res) {
    delete req.body.manucipality
    models.Manucipality.create(req.body).then(function(result) {
      res.redirect("/manucipality");
    });
  });

  /* Edit Manucipalitys page. */
  router.post('/manucipality/edit_manucipality', function(req, res) {
    models.Manucipality.update({
      manucipality_name: req.body.manucipality_name
    },{
      where: {
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/manucipality');
    });
  });

  /* Delete Manucipalitys page. */
  router.post('/manucipality/delete_manucipality', function(req, res) {
    models.Manucipality.destroy({
      where:{
        id:req.body.id
      }
    }).then(function(result){
      res.redirect('/manucipality?msg=1');
    }).catch(function(err){
      res.redirect('/manucipality?msg=2');
    });
  });



}