'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.User, { foreignKey: 'userId' })
      Reaction.belongsTo(models.Ankamantatra, { foreignKey: 'ankamantatraId' })
    }
  }
  Reaction.init({
    like: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    ankamantatraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};