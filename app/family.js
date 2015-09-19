var models = require("../models");
exports.family_mgr = {
  /* get  all families */
  get_family : function(cb){
    models.Family.findAndCountAll({
        where: {
          status: 1
        },
        order: '`id` ASC',
        include: [{
          model: models.Office,
          where: {
            status: 1
          }
      }]
      })
      .then(function (result) {
        models.Office.findAll({
            where: {
              status: 1
            }
          })
          .then(function (offices) {
            cb({result:result,offices:offices})
            /*res.render('family', {
              title: 'مكاتب الأصدار',
              familys: result.rows,
              offices: offices
            });*/
          });
      });
    },
  


   /* add new family*/
  add_family: function (body, cb) {
    models.Family.create(body).then(function (result) {
        cb("/family");
      });
  },


  /* update family*/
  edit_family : function(body,cb){
    models.Family.destroy({
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/family?msg=1');
      })
      .catch(function (err) {
        cb('/family?msg=2');
      });
  },


  /*delete family  */
  delete_family : function(body,cb){
    models.Family.destroy({
        where: {
          id: body.id
        }
      })
    // cb its same return  ruslut at page family router
      .then(function (result) {
        cb('/family?msg=1');
      })
      .catch(function (err) {
        cb('/family?msg=2');
      });
  },



};