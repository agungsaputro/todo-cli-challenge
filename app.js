
const Sequelize = require('sequelize');
const program = require('@caporal/core');




const sequelize = new Sequelize({
    username: "root",
    password: null,
    database: "database_development",
    host: '127.0.0.1',
    dialect: 'mysql'
  });

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  }).finally(() => {
    sequelize.close();
  });

  