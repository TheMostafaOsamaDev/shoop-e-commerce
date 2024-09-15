'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('admins', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'admin_user_avatar.png',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('admins', 'avatar');
  },
};
