"use strict";

module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    job_name: DataTypes.STRING (60) ,
    status:{type:DataTypes.INTEGER(1),defaultValue:1} 
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Job;
};
