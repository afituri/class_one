var models = require("../models");
exports.branch_mgr = {
	/* get  all branchs */
	get_branch: function (cb) {
		models.Branch.findAndCountAll({
				where: {
					status: 1
				},
				order: '`id` ASC',
				include: [{
					model: models.Region,
					where: {
						status: 1
					}
      }]
			})
			.then(function (result) {
				models.Region.findAll({
						where: {
							status: 1
						}
					})
					.then(function (regions) {
						cb({
							branch: result,
							regions: regions
						});
					});
			});
	},

	get_branch_by_region_id: function (id, cb) {
		models.Branch.findAll({
				where: {
					status: 1,
					RegionId: id
				}
			})
			.then(function (branches) {
				cb(branches);
			});
	},

	add_branch: function (body, cb) {
		models.Branch.create(body)
			.then(function (result) {
				cb("/branch");
			});
	},

	update_branch: function (body, cb) {
		models.Branch.update({
				branch_name: body.branch_name,
				RegionId: body.RegionId
			}, {
				where: {
					id: body.id
				}
			})
			.then(function (result) {
				cb('/branch');
			});
	},

	delete_branch: function (body, cb) {
		models.Branch.destroy({
				where: {
					id: body.id
				}
			})
			.then(function (result) {
        cb('/branch?msg=1');
			})
			.catch(function (err) {
				cb('/branch?msg=2');
			});
	},


};
