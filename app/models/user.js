"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      sns_type: {
        type: DataTypes.STRING
      },
      sns_id: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      birthdate: {
        type: DataTypes.DATE
      },
      gender: {
        type: DataTypes.STRING
      },
      fcm_token: {
        type: DataTypes.TEXT
      },
      term_service: {
        type: DataTypes.STRING
      },
      term_private: {
        type: DataTypes.STRING
      },
      term_location: {
        type: DataTypes.STRING
      },
      term_ads: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN
      },
      rank_point: {
        type: DataTypes.INTEGER
      },
      rank_name: {
        type: DataTypes.STRING
      },
      last_login_at: {
        type: DataTypes.DATE
      },
      deleted_at: {
        type: DataTypes.DATE
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
