'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      auditId: {
        type: Sequelize.INTEGER,
        references: {
          model: "audits",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id"
        },
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('logs');
  }
};



