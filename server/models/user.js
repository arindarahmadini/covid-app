'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/bcrypt')

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
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your full name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      is: /^[0-9a-f]{64}$/i,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        }
      }
    },
    province: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: (user, opt) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};