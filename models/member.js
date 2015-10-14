"use strict";

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
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
        Member.belongsTo(models.Family, {
          foreignKey : {
            name : 'from_family_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
      }
    }
  });
  return Member;
};
