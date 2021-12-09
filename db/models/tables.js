const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Users);
      // this.hasMany(models.Interests);
      // this.belongsToMany(Interests, { through: 'Tables', foreignKey: 'user_id' });
      // this.belongsToMany(Users, { through: 'Tables', foreignKey: 'interest_id' });
    }
  }
  Tables.init({
    user_id: DataTypes.INTEGER,
    interest_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tables',
  });
  return Tables;
};
