"use strict";

module.exports = function(sequelize, DataTypes) {
  var Personal = sequelize.define("Personal", {
    Person_Id: DataTypes.BIGINT(11),
    national_id: DataTypes.STRING(12),
    Arabic_Firstname: DataTypes.STRING (60) ,
  	Arabic_Fathername: DataTypes.STRING (60) ,
  	Arabic_Grandfathername: DataTypes.STRING (60) ,
  	Arabic_Familyname: DataTypes.STRING (60) ,
  	Arabic_Motherfirstname: DataTypes.STRING (200) ,
  	Arabic_Motherfathername: DataTypes.STRING (60) ,
  	Arabic_Mothergrandfathername: DataTypes.STRING (60) ,
  	Arabic_Motherfamilyname: DataTypes.STRING (60) ,
  	Birth_Date: DataTypes.DATEONLY(),
  	Birth_Place: DataTypes.STRING (60) ,
  	Gender: DataTypes.INTEGER (1) ,
  	Religion_Id: DataTypes.INTEGER (1) ,
  	Enlistingdate: DataTypes.DATEONLY(),
  	Socialstatus_Id: DataTypes.INTEGER (2) ,
  	Is_Alive: DataTypes.INTEGER (1) ,
  	Regdoctype_Id: DataTypes.INTEGER (2) ,
  	Certification_Type_Id: DataTypes.INTEGER (2) ,
  	CertificationMber: DataTypes.STRING (20) ,
  	Certification_File_Number: DataTypes.STRING (20) ,
  	Certification_Issuance_Date: DataTypes.DATEONLY() ,
  	PersonalType:{type:DataTypes.INTEGER(1),defaultValue:1},
  	status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {
        Personal.belongsTo(models.Personal, {
          as: 'Father', 
          foreignKey : {
            name : 'Fatherperson_Id',
            allowNull : true
          },
          onDelete: "SET NULL",
        });
        Personal.belongsTo(models.Personal, {
          as: 'Mother', 
          foreignKey : {
            name : 'Motherperson_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
        Personal.belongsTo(models.Country, {
          as: 'Nationality', 
          foreignKey : {
            name : 'Nationality_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
        Personal.belongsTo(models.Country, {
          as: 'Mother_Nationality', 
          foreignKey : {
            name : 'Mothernationality_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
        Personal.belongsTo(models.Country, {
          as: 'Father_Nationality', 
          foreignKey : {
            name : 'Fathernationality_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
        Personal.belongsTo(models.City, {
          as: 'city_birth', 
          foreignKey : {
            name : 'city_Id',
            allowNull : true
          },
          onDelete: "SET NULL"
        });
        Personal.belongsTo(models.Job, {
          onDelete: "SET NULL",
          foreignKey: {
            allowNull: true
          }
        });
      }
    }
  });
  return Personal;
};
