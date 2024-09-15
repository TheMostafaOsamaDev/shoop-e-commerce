'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('productImages', {
      fields: ['url'],
      type: 'unique',
      name: 'unique_productImages_url',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'productImages',
      'unique_productImages_url',
    );
  },
};
