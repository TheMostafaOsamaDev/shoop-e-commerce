'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('admins', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn('admins', 'lastLogin', {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn('admins', 'lastLogout', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('admins', 'deletedAt', {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('admins', 'lastLogin', {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('admins', 'lastLogout', {
      allowNull: false,
      type: Sequelize.STRING,
    });
  },
};
