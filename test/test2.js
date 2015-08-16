var models = require("../models");

// var obj_office = {
// 	office_name : "الابيار",
// 	RegionId:1
// }

// models.Office.create(obj_office).then(function(result) {
//   console.log(result);
// });

// update

// var obj_office = {
// 	office_name : "ترهونة",
// 	RegionId:3
// }

// models.Office.update(obj_office,{

// 	where : {
// 		id:2
// 	} 
// }).then(function(result) {
//   console.log(result);
// });

   // logic dell

// var obj_office = {
// 	status:0
// }

// models.Office.update(obj_office,{

// 	where : {
// 		id:2
// 	} 
// }).then(function(result) {
//   console.log(result);
// });



   // real dell

models.Office.destroy({

	where : {
		id:3
	} 
}).then(function(result) {
  console.log(result);
});
