'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database_development', 'root', '', {
    username: "root",
    password: null,
    database: "database_development",
    host: '127.0.0.1',
    dialect: 'mysql'
});

(async() => {
  try {
      await sequelize.authenticate();
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }

})();

class Todo extends Model{
  };
Todo.init({
  task: {
      type: DataTypes.STRING,
      allowNull: false
    },
  status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Todo'
});

(async() => {
  await Todo.sync();
})()

module.exports = { Todo, sequelize }