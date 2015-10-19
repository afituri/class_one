"use strict";

module.exports = function(sequelize, DataTypes) {
  var Marriage = sequelize.define("Marriage", {
    marriage_date: DataTypes.DATEONLY(),
    register_date: DataTypes.DATEONLY(),
    marriage_place: DataTypes.TEXT(),
    contract_number: DataTypes.STRING(20),
    record_marriage_nu: DataTypes.STRING(20),
    marriage_type: DataTypes.INTEGER(1),
    status:{type:DataTypes.INTEGER(1),defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        Marriage.belongsTo(models.Personal, {
          as: 'Husband', 
          foreignKey : {
            name : 'husband_personal_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Marriage.belongsTo(models.Family, {
          foreignKey : {
            name : 'husband_family_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Marriage.belongsTo(models.Personal, {
          as: 'Wife', 
          foreignKey : {
            name : 'wife_personal_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Marriage.belongsTo(models.Family, {
          foreignKey : {
            name : 'wife_family_Id',
            allowNull : true
          },
          onDelete: "restrict",
        });
        Marriage.belongsTo(models.Office, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
        Marriage.belongsTo(models.City, {
          onDelete: "restrict",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Marriage;
};
