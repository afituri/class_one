"use strict";

module.exports = function(sequelize, DataTypes) {
  var Birth = sequelize.define("Birth", {
    birth_type: DataTypes.INTEGER(1),
    children_no: DataTypes.INTEGER(2),
    informer_type: DataTypes.INTEGER(1),
    informer_name: DataTypes.STRING(150),
    informer_address: DataTypes.TEXT(),
    record_no: DataTypes.STRING(20),
    record_paper_no: DataTypes.STRING(20),
    place_of_birth: DataTypes.INTEGER(1),
    newborn_type: DataTypes.INTEGER(1),
    newborn_reporting: DataTypes.INTEGER(1),
    newborn_state: DataTypes.INTEGER(1),
    newborn_health: DataTypes.INTEGER(1),
    pregnancy_period: DataTypes.INTEGER(1),
    weight: DataTypes.FLOAT(),
    midwife_type: DataTypes.INTEGER(1),
    midwife_name: DataTypes.STRING(150),
    status:{type:DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Birth.belongsTo(models.Personal, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Birth.belongsTo(models.Office, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Birth;
};
