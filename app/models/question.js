'use strict';

module.exports = (sequelize, DataTypes) => {

  const question = sequelize.define('questions', {
    conformity: {
      type: DataTypes.SMALLINT,
    },
    question:{
      type: DataTypes.TEXT
    },
    answer:{
      type: DataTypes.STRING
    },
    scoring: {
      type: DataTypes.SMALLINT,
    },
    comment:{
      type: DataTypes.TEXT
    }
  }, {
    tableName: "questions"
  });

  question.associate = function(models) {
    question.belongsTo(models.groups, { as :'groups',foreignKey: "groupId"})
    question.belongsTo(models.statuses, {as:'statuses', foreignKey: "statusId"})
    question.hasMany(models.images, { foreginKey: "questions"})
    };

  return question;
};