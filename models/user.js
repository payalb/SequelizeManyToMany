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
    }
  }
  User.init({
    firstname:{
      type:  DataTypes.STRING,
      allowNull: false,
      field: "u_fname"  
    },
    lastname: {
      type:  DataTypes.STRING,
      allowNull: false,
      field: "u_lname"  
    },
    location: {
      type:  DataTypes.STRING,
      field: "u_location"  
    },
    age:{
      type:  DataTypes.INTEGER,
      field: "u_age"  
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};