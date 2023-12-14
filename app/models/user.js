"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique:true
      },
      ballance: {
        type: DataTypes.INTEGER,
        defaultValue:0
      },
    },
    {
      tableName: "users",
    
    }
  );

  user.associate = function (models) {
  };

  return user;
};
