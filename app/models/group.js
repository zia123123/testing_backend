'use strict';

module.exports = (sequelize, DataTypes) => {

  const group = sequelize.define('groups', {
    name_group: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: "groups"
  });

  group.associate = function(models) {
    group.belongsTo(models.audits, { as :'audits',foreignKey: "auditId"})
    group.hasMany(models.questions, { foreginKey: "groups"})
  };

  return group;
};