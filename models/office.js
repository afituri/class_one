"use strict";

module.exports = function(sequelize, DataTypes) {
  var Office = sequelize.define("Office", {
    office_name: DataTypes.STRING(60),
    latitude: DataTypes.STRING(20),
    longitude: DataTypes.STRING(20),
    status :{type :DataTypes.INTEGER(1),defaultValue:1 }
      
  }, {
    classMethods: {
      associate: function(models) {
        Office.belongsTo(models.Branch, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Office.belongsTo(models.Manucipality, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
   
      }
    }
  });

  return Office;
};
