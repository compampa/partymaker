module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Interests', [
      { title: 'qwiz', createdAt: new Date(), updatedAt: new Date() },
      { title: 'sport', createdAt: new Date(), updatedAt: new Date() },
      { title: 'movie', createdAt: new Date(), updatedAt: new Date() },
      { title: 'literature', createdAt: new Date(), updatedAt: new Date() },
      { title: 'science', createdAt: new Date(), updatedAt: new Date() },
      { title: 'animals', createdAt: new Date(), updatedAt: new Date() },
      { title: 'cook', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Interests', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
