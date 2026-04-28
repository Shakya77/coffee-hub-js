'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('password', 10);

    // 1. Insert users
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@coffeehub.com',
        password,
        slug: 'admin-user',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Farmer One',
        email: 'farmer1@coffeehub.com',
        password,
        slug: 'farmer-one',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agronomist One',
        email: 'agro1@coffeehub.com',
        password,
        slug: 'agronomist-one',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // 2. Fetch users
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    // 3. Helper maps
    const userMap = {};
    users.forEach((u) => {
      userMap[u.email] = u.id;
    });

    const roleMap = {};
    roles.forEach((r) => {
      roleMap[r.name] = r.id;
    });

    // 4. Insert user-role relations
    await queryInterface.bulkInsert('user_has_roles', [
      {
        userId: userMap['admin@coffeehub.com'],
        roleId: roleMap['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userMap['farmer1@coffeehub.com'],
        roleId: roleMap['farmer'],
        contactNumber: '+251911000111',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userMap['agro1@coffeehub.com'],
        roleId: roleMap['agronomist'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_has_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
