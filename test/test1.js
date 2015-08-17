var models = require("../models");

var obj_region = {
	region_name : "سبها"
}

models.Region.create(obj_region).then(function(result) {
  console.log(result);
});