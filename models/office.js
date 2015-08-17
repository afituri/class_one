"use strict";

module.exports = function(sequelize, DataTypes) {
  var office = sequelize.define("office", {
    office_name: DataTypes.STRING(60),
    status :{type :DataTypes.INTEGER(1),defaultValue:1 }
  
    
  }, {
    classMethods: {
      associate: function(models) {
   
      }
    }
  });

  return office;
};
