'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auditteams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isLead: {
        type: Sequelize.INTEGER
      },
      auditorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "auditors",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      auditId: {
        type: Sequelize.INTEGER,
        references: {
          model: "audits",
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
    await queryInterface.dropTable('auditteams');
  }
};