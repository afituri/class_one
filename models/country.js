"use strict";

module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define("Country", {
    country_name: DataTypes.STRING (60) ,
    nationality_male: DataTypes.STRING (60) ,
    nationality_female: DataTypes.STRING (60) ,
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Country;
};
