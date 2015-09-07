var models = require("../models");

//// new insert
// var obj_region = {
// 	region_name : "مصراته"
// }

var obj_region = {
	region_name : "سبها"
}


// models.Region.create(obj_region).then(function(result) {
//   console.log(result);
// });


//// update region_name

// var obj_region = {
// 	region_name : "الخمس"
// }

// models.Region.update(obj_region,{
// 	where:{
// 		id:2
// 	}
// }).then(function(result) {
//   console.log(result);
// });


//// update status in delete

// var obj_region = {
// 	status : 0
// }

// models.Region.update(obj_region,{
// 	where:{
// 		id:1
// 	}
// }).then(function(result) {
//   console.log(result);
// });

////


models.Region.destroy({
	where:{
		id:1
	}
}).then(function(result) {
  console.log(result);
});