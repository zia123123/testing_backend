'use strict';

module.exports = (sequelize, DataTypes) => {

  const auditor = sequelize.define('auditors', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
    type: DataTypes.STRING,
      allowNull: false,
    },
    id_lead: {
    type: DataTypes.INTEGER,
    }
  }, {
    tableName: "auditors"
  });

  auditor.associate = function(models) {
    auditor.hasMany(models.auditteams, { foreginKey: "auditors"})
  };

  return auditor;
};