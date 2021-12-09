'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Themes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
			this.belongsToMany(Users, { through: 'Tables', foreignKey: 'theme_id' });
      // define association here
    }
  };
  Themes.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Themes',
  });
  return Themes;
};
