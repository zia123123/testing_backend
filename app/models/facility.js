'use strict';

module.exports = (sequelize, DataTypes) => {

  const facility = sequelize.define('facilities', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
    type: DataTypes.STRING,
      allowNull: false,
    },
    name_facility: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: "facilities"
  });

  facility.associate = function(models) {
    facility.belongsTo(models.countries, { foreignKey: "countryId"})
    facility.hasMany(models.audits, {  foreginKey: "audits"})
  };

  return facility;
};