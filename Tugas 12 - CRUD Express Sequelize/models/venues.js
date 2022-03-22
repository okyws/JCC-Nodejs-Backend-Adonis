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
    name: DataTypes.CHAR,
    address: DataTypes.CHAR,
    phone: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Venues',
  });
  return Venues;
};