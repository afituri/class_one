"use strict";

module.exports = function(sequelize, DataTypes) {
  var Divorce = sequelize.define("Divorce", {
    divorce_date: DataTypes.DATEONLY(),
    divorce_place: DataTypes.TEXT(),
    contract_number: DataTypes.STRING(20),
    record_divorce_nu: DataTypes.STRING(20),
    divorce_type: DataTypes.INTEGER(1),
    wife_custody: DataTypes.INTEGER(1),
    wife_bt_family: DataTypes.INTEGER(1),
    status:{type:DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Divorce.belongsTo(models.Personal, {
          as: 'Husband', 
          foreignKey : {
            name : 'husband_personal_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Divorce.belongsTo(models.Family, {
          foreignKey : {
            name : 'husband_family_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Divorce.belongsTo(models.Personal, {
          as: 'Wife', 
          foreignKey : {
            name : 'wife_personal_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Divorce.belongsTo(models.Family, {
          foreignKey : {
            name : 'wife_family_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Divorce.belongsTo(models.Office, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Divorce.belongsTo(models.City, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Divorce;
};
