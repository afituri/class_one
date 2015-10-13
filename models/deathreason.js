"use strict";

module.exports = function(sequelize, DataTypes) {
  var Deathreason = sequelize.define("Deathreason", {
    reason_name: DataTypes.STRING (150) ,
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Deathreason;
};
