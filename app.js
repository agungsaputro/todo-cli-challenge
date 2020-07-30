
const Sequelize = require('sequelize');
const program = require('@caporal/core');
const Todo = require('./models/todo')

const list = async() => {
    const todos = await Todo.findAll({
        attributes: ['id', 'task', 'status']
    });
    if (todos.length > 0) {
        todos.map((value) => {
            const activity = value.dataValues.status == true ? value.dataValues.task + ' (DONE)' : value.dataValues.task;
            console.log(`${value.dataValues.id}. ${activity}`)
        })
    } else {
        console.log('empty')
    }
}

const add = async(todo) => {
    const t = await sequelize.transaction();
    try {

        const result = await sequelize.transaction(async(todos) => {
            const list = await Todo.create({
                task: todo
            }, { transaction: todos });
            return list;

        });

        await todos.commit().then((val) => {
            console.log('succes added data')
        });

    } catch (error) {

        await t.rollback();
        console.log('error')

    }

}

program
    .command("list", "show list Todos")
    .action(({ logger, args, options }) => {
        console.log(list());
    })
    .command("add", "add list")
    .argument("<value>", "text task")
    .action(({ logger, args, options }) => {
        add(args.text)
    })

program.run()