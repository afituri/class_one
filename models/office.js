"use strict";

module.exports = function(sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    office_name: DataTypes.STRING(60),
    status :{type :DataTypes.INTEGER(1),defaultValue:1 }
      
  }, {
    classMethods: {
      associate: function(models) {
   
      }
    }
  });

  return Office;
};
