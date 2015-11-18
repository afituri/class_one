var models = require("../models");
exports.job_mgr = {
  // get all jobs
  get_job: function (cb) {
    models.Job.findAndCountAll({
        where: {
          status: 1
        }
      })
      .then(function (result) {
        cb(result);
      });
  },

   get_job_by_id: function (id,mid,cb) {
    models.Job.findAndCountAll({
        where: {
          status: 1,
          id:id
        }
      })
      .then(function (father_job) {
        models.Job.findAndCountAll({
        where: {
          status: 1,
          id:mid
        }
      })
      .then(function (mother_job) {
        cb({father_job:father_job,mother_job:mother_job});
      });
      });
  },
  // add new job
  add_job: function (body, cb) {
    models.Job.create(body)
      .then(function (result) {
        cb("/job?msg=3");
      });
  },
  // update job
  update_job: function (body, cb) {
    models.Job.update({
        job_name: body.job_name
      }, {
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/job?msg=4');
      });
  },
  // delete job
  delete_job: function (body, cb) {
    models.Job.destroy({
        where: {
          id: body.id
        }
      })
      .then(function (result) {
        cb('/job?msg=1');
      })
      .catch(function (err) {
        cb('/job?msg=2');
      });
  },








};
