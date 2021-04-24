'use strict';

module.exports = (sequelize, DataTypes) => {

  const regional = sequelize.define('regionals', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
    type: DataTypes.STRING,
      allowNull: false,
    },
    id_head: {
    type: DataTypes.INTEGER,
    }
  }, {
    tableName: "regionals"
  });

  regional.associate = function(models) {
    //regional.hasMany(models.audits, {  foreginKey: "audits"})
  };

  return regional;
};