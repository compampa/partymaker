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
		 await queryInterface.bulkInsert('Themes', [
      { title: 'Приключения и веселые истории', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Странности', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Юмор', createdAt: new Date(), updatedAt: new Date() },
      { title: 'То, что не нравится', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Книги', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Хобби', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Сериалы', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Themes', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
