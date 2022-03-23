'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Venues.init({
    name: DataTypes.STRING(191),
    address: DataTypes.STRING(255),
    phone: DataTypes.STRING(45)
  }, {
    sequelize,
    modelName: 'Venues',
  });
  return Venues;
};