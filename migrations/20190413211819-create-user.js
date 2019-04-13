'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING(25),
        allowNull: false,
        field: 'userName'
      },
      emailId: {
        type: Sequelize.STRING(25),
        allowNull: false,
        primaryKey: true,
        field: 'emailId'
      },
      phoneNo: {
        type: Sequelize.STRING(25),
        allowNull: false,
        field: 'phoneNo'
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'password'
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'dateTime'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
