var models = require("../models");

var obj_office = {
	office_name : "طرابلس"
}

models.office.create(obj_office).then(function(result) {
  console.log(result);
});