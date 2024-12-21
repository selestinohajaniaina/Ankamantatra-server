'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ankamantatra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ankamantatra.belongsTo(models.User, { foreignKey: 'userId' })
      Ankamantatra.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Ankamantatra.init({
    content: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ankamantatra',
  });
  return Ankamantatra;
};