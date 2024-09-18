'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carts', 'userId', {
      type: Sequelize.CHAR(36),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carts', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
