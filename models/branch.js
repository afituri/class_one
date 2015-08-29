"use strict";

module.exports = function(sequelize, DataTypes) {
  var Branch = sequelize.define("Branch", {
    branch_name: DataTypes.STRING(60),
    status :{type :DataTypes.INTEGER(1),defaultValue:1 }
      
  }, {
    classMethods: {
      associate: function(models) {
        Branch.belongsTo(models.Region, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
   
      }
    }
  });

  return Branch;
};
