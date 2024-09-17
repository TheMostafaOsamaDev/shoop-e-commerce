'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'title', {
      type: Sequelize.TEXT,
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'title', {
      type: Sequelize.STRING,
    });
  },
};
