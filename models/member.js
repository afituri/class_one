"use strict";

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {

    FromRegistrynumber: DataTypes.STRING(10),
    FromRecordnumber: DataTypes.STRING(12),
  	status:{type:DataTypes.INTEGER(1),defaultValue:1} 
	      
  }, {
    classMethods: {
      associate: function(models) {
        Member.belongsTo(models.Office, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Member.belongsTo(models.Kinship, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Member.belongsTo(models.Personal, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Member.belongsTo(models.Family, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Member;
};
