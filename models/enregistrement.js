'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enregistrement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enregistrement.belongsTo(models.User, { foreignKey: 'userId' })
      Enregistrement.belongsTo(models.Ankamantatra, { foreignKey: 'ankamantatraId' })
    }
  }
  Enregistrement.init({
    userId: DataTypes.INTEGER,
    ankamantatraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enregistrement',
  });
  return Enregistrement;
};