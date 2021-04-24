'use strict';

module.exports = (sequelize, DataTypes) => {

  const audit = sequelize.define('audits', {
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    spesifik_area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendance: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: "audits"
  });

  audit.associate = function(models) {
   audit.belongsTo(models.auditypes, { as :'auditypes',foreignKey: "auditypeId"})
   audit.belongsTo(models.facilities, { as:'facilities', foreignKey: "facilityId"})
   audit.belongsTo(models.regionals, { foreignKey: "userCreatedId"})
   audit.belongsTo(models.regionals, { foreignKey: "leadId"})
   audit.belongsTo(models.statuses, {as:'statuses', foreignKey: "statusId"})
   audit.hasMany(models.auditteams, { foreginKey: "auditteams"})
   audit.hasMany(models.groups, { foreginKey: "audit_id"})
   audit.hasMany(models.logs, { foreginKey: "audits"})
  };

  return audit;
};