'use strict';
const { Sequelize } = require('sequelize');
module.exports = {
  /**
   *
   * @param {import('sequelize')} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,

        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
        published: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
