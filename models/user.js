'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'userName'
    },
    emailId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
      field: 'emailId'
    },
    phoneNo: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'phoneNo'
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'password'
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'dateTime'
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
