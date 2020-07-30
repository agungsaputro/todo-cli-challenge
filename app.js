
const Sequelize = require('sequelize');
const program = require('@caporal/core');
const Todo = require('./models/todo')

const list = async() => {
    const todos = await Todo.findAll({
        attributes: ['id', 'task', 'status']
    });
    if (todos.length > 0) {
        todos.map((v, i) => {
            const activity = v.dataValues.status == true ? v.dataValues.task + ' (DONE)' : v.dataValues.task;
            console.log(`${v.dataValues.id}. ${activity}`)
        })
    } else {
        console.log('empty')
    }
}

const add = async(todo) => {
    const t = await sequelize.transaction();
    try {

        const result = await sequelize.transaction(async(t) => {
            const list = await Todo.create({
                task: todo
            }, { transaction: t });
            return list;

        });

        await t.commit().then((val) => {
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
    .argument("<text>", "text task")
    .action(({ logger, args, options }) => {
        add(args.text)
    })

program.run()