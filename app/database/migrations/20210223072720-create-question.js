'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conformity: {
        type: Sequelize.SMALLINT
      },
      question: {
        type: Sequelize.TEXT
      },
      answer: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.TEXT
      },
      scoring: {
        type: Sequelize.SMALLINT
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "groups",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};