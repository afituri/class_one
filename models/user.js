"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING(150),
    email: DataTypes.STRING(150),
    phone: DataTypes.STRING(20),
    password: DataTypes.STRING(500),
    salt: DataTypes.STRING(500),
    level: DataTypes.INTEGER(1),
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return User;
};
