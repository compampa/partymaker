module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // имя таблицы а не модели
          key: 'id',
        },
      },
      interest_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Interests', // имя таблицы а не модели
          key: 'id',
        },
      },
      theme_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Themes', // имя таблицы а не модели
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tables');
  },
};
