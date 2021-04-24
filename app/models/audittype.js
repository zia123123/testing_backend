'use strict';

module.exports = (sequelize, DataTypes) => {

  const auditype = sequelize.define('auditypes', {
    name_audit: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    tableName: "auditypes"
  });

  auditype.associate = function(models) {
    auditype.hasMany(models.audits, { as: 'auditypes', foreginKey: "auditypes"})
  };

  return auditype;
};