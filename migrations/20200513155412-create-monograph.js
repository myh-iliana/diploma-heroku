'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Monographs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      section: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      monographPages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      printPages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      annotations: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: true
      },
      doi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isEuLanguage: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      files: {
        type: Sequelize.STRING,
        allowNull: true
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Monographs');
  }
};
