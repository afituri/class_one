"use strict";

module.exports = function(sequelize, DataTypes) {
  var Region = sequelize.define("Region", {
    region_name: DataTypes.STRING (60) ,
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Region;
};
