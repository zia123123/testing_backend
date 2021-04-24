'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('audits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      spesifik_area: {
        type: Sequelize.STRING
      },
      attendance: {
        type: Sequelize.STRING
      },
      userCreatedId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "regionals",
          key: "id"
        }
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "statuses",
          key: "id"
        }
      },
      leadId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "regionals",
          key: "id"
        }
      },
      auditypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "auditypes",
          key: "id"
        }
      },
      facilityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "facilities",
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
    await queryInterface.dropTable('audits');
  }
};