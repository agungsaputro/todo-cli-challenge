const models = require('../models')



class ControllerTodo{
    static add(name_task,done){
        models.Todo.create({
            name_task: name_task,
            done: done
        })
            .then(data =>{
                console.log(data)
            })
            .catch(err =>{
                console.log("error")
            })
    }
    static read(){
        models.Todo.findAll()
        .then(dataAllTodo =>{
            dataAllTodo.forEach(data => {
                console.log(data)
            })
        })
        .catch(err =>{
            console.log("error")
        })
    }
    static update(id, name_task,done){
        models.Todo.update({
            name_task:name_task,
            done:done
        },{
            where:{
                id:id
            }
        })
        .then(() =>{
            console.log(`Data with id ${id} succes update`)
        })
        .catch(err =>{
            console.log("error")
        })
    }
    static delete(id){
        models.Todo.destroy({
            where:{
                id:id
            }
        })
        .then(() =>{
            console.log(`Data with id ${id} success deleted`)
        })
        .catch(err => {
            console.log("error")
        })
    }
}

module.exports = ControllerTodo