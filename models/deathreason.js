"use strict";

module.exports = function(sequelize, DataTypes) {
  var deathreason = sequelize.define("deathreason", {
    reason_name: DataTypes.STRING (150) ,
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return deathreason;
};
