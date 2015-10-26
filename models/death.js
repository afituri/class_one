"use strict";

module.exports = function(sequelize, DataTypes) {
  var Death = sequelize.define("Death", {
    death_date: DataTypes.DATEONLY(),
    death_time: DataTypes.TIME(),
    inform_date: DataTypes.DATEONLY(),
    pod_type: DataTypes.INTEGER(1),
    pod_description: DataTypes.TEXT(),
    pod_area: DataTypes.TEXT(),
    doctor_name: DataTypes.STRING(150),
    medical_report: DataTypes.TEXT(),
    death_type: DataTypes.INTEGER(1),
    unatural_type: DataTypes.INTEGER(1),
    record_no: DataTypes.STRING(20),
    record_paper_no: DataTypes.STRING(20),
    status:{type:DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Death.belongsTo(models.Personal, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Death.belongsTo(models.Office, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Death.belongsTo(models.City, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Death.belongsTo(models.Deathreason, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Death;
};
