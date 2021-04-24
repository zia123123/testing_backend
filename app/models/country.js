'use strict';

module.exports = (sequelize, DataTypes) => {

  const country = sequelize.define('countries', {
    name_country: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    tableName: "countries"
  });

  country.associate = function(models) {
    country.hasMany(models.facilities, {  foreginKey: "countries"})

  };

  return country;
};