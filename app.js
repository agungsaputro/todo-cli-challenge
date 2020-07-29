const argv = process.argv.slice(2)

const controllerTodo = require('./controllers/todo')

const [table, command, ...args] = argv

const Sequelize = require('sequelize');
const todo = require('./models');

const sequelize = new Sequelize('rf_todoapp', 'root', '', {
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
