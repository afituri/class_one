"use strict";

module.exports = function(sequelize, DataTypes) {
  var office = sequelize.define("office", {
    Office_Name_Ar: DataTypes.STRING(60),
    Status :{type :DataTypes.INTEGER(1),defaultValue:1 }
  
    
  }, {
    classMethods: {
      associate: function(models) {
   
      }
    }
  });

  return office;
};
