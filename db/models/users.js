const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Interests, Tables, Themes }) {
      // define association here
      this.belongsToMany(Interests, { through: 'Tables', foreignKey: 'user_id' });
      this.belongsToMany(Themes, { through: 'Tables', foreignKey: 'user_id' });

      // this.hasMany(models.Interests);
    }
  }
  Users.init({
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    smoke: DataTypes.BOOLEAN,
    drink: DataTypes.BOOLEAN,
    social: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
