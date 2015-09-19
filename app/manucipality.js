var models = require("../models");
exports.manucipality_mgr = {
	// get all Manucipality
	get_manucipality: function (cb) {
		models.Manucipality.findAndCountAll({
				where: {
					status: 1
				}
			})
			.then(function (result) {
				cb(result);
			});
	},
	// add new manucipality
	add_manucipality: function (body, cb) {
		models.Manucipality.create(body)
			.then(function (result) {
				cb("/manucipality?msg=3");
			});
	},
	// update manucipality
	update_manucipality: function (body, cb) {
		models.Manucipality.update({
				manucipality_name: body.manucipality_name
			}, {
				where: {
					id: body.id
				}
			})
			.then(function (result) {
				cb('/manucipality?msg=4');
			});
	},
	// delete manucipality
	delete_manucipality: function (body, cb) {
		models.Manucipality.destroy({
				where: {
					id: body.id
				}
			})
			.then(function (result) {
				cb('/manucipality?msg=1');
			})
			.catch(function (err) {
				cb('/manucipality?msg=2');
			});
	},
};
