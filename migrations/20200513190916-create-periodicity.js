'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Periodicities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      udc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      journal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      issueNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      journalPages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      annotations: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      issn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isScopusAndWS: {
        type: Sequelize.BOOLEAN
      },
      isScientometrics: {
        type: Sequelize.BOOLEAN
      },
      isProfessional: {
        type: Sequelize.BOOLEAN
      },
      isElectronic: {
        type: Sequelize.BOOLEAN
      },
      files: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      author: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subauthors: {
        type: Sequelize.STRING,
        allowNull: true,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Periodicities');
  }
};
