const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Tables }) {
      // define association here
      // this.belongsToMany(Users, { through: 'Tables', foreignKey: 'interest_id' });
      // this.hasMany(models.Users);
    }
  }
  Interests.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Interests',
  });
  return Interests;
};
