"use strict";

module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define("City", {
    city_name: DataTypes.STRING(60),
    status :{type :DataTypes.INTEGER(1),defaultValue:1 }
      
  }, {
    classMethods: {
      associate: function(models) {
        City.belongsTo(models.Country, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
   
      }
    }
  });

  return City;
};
