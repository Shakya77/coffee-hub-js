'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        slug: 'admin',
        description:
          'System administrator responsible for managing users, roles, content moderation, and ensuring the smooth operation of the Coffee Info Hub platform.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'agronomist',
        slug: 'agronomist',
        description:
          'Agricultural expert who provides verified guidance on coffee cultivation, disease management, soil health, and sustainable farming practices to support farmers.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'vendor',
        slug: 'vendor',
        description:
          'Skilled or unskilled agricultural worker who can view and apply for farming tasks such as pruning, harvesting, cutting, and other short-term labor opportunities posted by farmers.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'farmer',
        slug: 'farmer',
        description:
          'Coffee farmer who accesses expert knowledge, views informational content, and posts recruitment requests for agricultural tasks to improve farm productivity.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', null, {});
  },
};
