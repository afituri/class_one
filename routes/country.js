var models = require("../models");
module.exports = function (router) {

	/* GET Countries page. */
	router.get('/country', function (req, res) {
		models.Country.findAndCountAll({
				where: {
					status: 1
				}
			})
			.then(function (result) {
				res.render('country', {
					title: 'بلدان الميلاد',
					countries: result.rows
				});
			});
	});

	/* Add Countries page. */
	router.post('/country/new_country', function (req, res) {
		models.Country.create(req.body)
			.then(function (result) {
				res.redirect("/country");
			});
	});

	/* Edit Countries page. */
	router.post('/country/edit_country', function (req, res) {
		models.Country.update({
				country_name: req.body.country_name,
				nationality_male: req.body.nationality_male,
				nationality_female: req.body.nationality_female
			}, {
				where: {
					id: req.body.id
				}
			})
			.then(function (result) {
				res.redirect('/country');
			});
	});

	/* Delete Countries page. */
	router.post('/country/delete_country', function (req, res) {
		models.Country.destroy({
				where: {
					id: req.body.id
				}
			})
			.then(function (result) {
				res.redirect('/country?msg=1');
			})
			.catch(function (err) {
				res.redirect('/country?msg=2');
			});
	});




}
