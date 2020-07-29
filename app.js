//const argv = process.argv.slice(2)

//const controllerTodo = require('./controllers/todo')

//const [table, command, ...args] = argv

const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

switch(table){
    case "todo":{
        switch(command){
            case 'add':{
                controllerTodo.add(...args)
                break
            }
            case 'read': {
                controllerTodo.read();
                break;
            }
            default:{
                console.log('item tidak ditemukan')
            }
        }
        break
    }
}
