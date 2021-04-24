'use strict';

module.exports = (sequelize, DataTypes) => {

  const auditteam = sequelize.define('auditteams', {
    isLead: {
      type:DataTypes.INTEGER,
    }

  }, {
    tableName: "auditteams"
  });

  auditteam.associate = function(models) {
   
    auditteam.belongsTo(models.audits, { as :'audits',foreignKey: "auditId"})
    auditteam.belongsTo(models.auditors, { as :'auditors',foreignKey: "auditorId"})

  };

  return auditteam;
};