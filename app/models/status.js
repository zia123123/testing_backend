'use strict';

module.exports = (sequelize, DataTypes) => {

  const status = sequelize.define('statuses', {
    name_status: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    tableName: "statuses"
  });

  status.associate = function(models) {
    status.hasMany(models.audits, { as: 'statuses', foreginKey: "statuses"})
    status.hasMany(models.questions, { as: 'statusesQuestion', foreginKey: "statuses"})
    status.hasMany(models.logs, { as: 'logs', foreginKey: "logs"})

  };

  return status;
};