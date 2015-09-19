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
	// add new job
	add_job: function (body, cb) {
		models.Job.create(body)
			.then(function (result) {
				cb("/job");
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
				cb('/job');
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
