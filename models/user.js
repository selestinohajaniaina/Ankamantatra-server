'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, { foreignKey: 'userId' })
      User.hasMany(models.Ankamantatra, { foreignKey: 'userId' })
      User.hasMany(models.Enregistrement, { foreignKey: 'userId' })
      User.hasMany(models.Response, { foreignKey: 'userId' })
      User.hasMany(models.Reaction, { foreignKey: 'userId' })
      User.hasMany(models.Notification, { foreignKey: 'userId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};