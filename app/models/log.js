'use strict';

module.exports = (sequelize, DataTypes) => {

  const log = sequelize.define('logs', {
    
  }, {
    tableName: "logs"
  });

  log.associate = function(models) {
    // role.hasMany(models.users, { as:"users",  foreginKey: "userId"})=
    log.belongsTo(models.audits, { as:'audits', foreignKey: "auditId"})
    log.belongsTo(models.statuses, { as:'statuses', foreignKey: "statusId"})
  };

  return log;
};