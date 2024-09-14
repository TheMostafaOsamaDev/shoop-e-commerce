'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // change id column to UUID
    await queryInterface.changeColumn('users', 'id', {
      type: Sequelize.UUID,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    });
  },
};
