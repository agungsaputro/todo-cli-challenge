const argv = process.argv.slice(2)

const controllerTodo = require('./controllers/todo')

const [table, command, ...args] = argv

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
