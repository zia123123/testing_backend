'use strict';

module.exports = (sequelize, DataTypes) => {

  const image = sequelize.define('images', {
    name_file: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: "images"
  });

  image.associate = function(models) {
    image.belongsTo(models.questions, { as :'questions',foreignKey: "questionId"})
  };

  return image;
};