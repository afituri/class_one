"use strict";

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
  	status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {
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
          as : 'from_family',
          foreignKey : {
            name : 'from_familyId',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
      }
    }
  });
  return Member;
};
