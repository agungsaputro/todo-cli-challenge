#!/usr/bin/env node

const models = require('../models')
const program = require('@caporal/core');
const Sequelize = require("sequelize")


const sequelize = new Sequelize("database_development", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging:false
  });
  
  sequelize.query("CREATE DATABASE `database_development`;").then(data => {
      console.log(data)
    })
    .catch(err => console.info("Database ada"));
  
  
    const Todo = sequelize.define("todo", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_task: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
    
  (async () => {
  
    try {
      
      await sequelize.authenticate();
      console.log("Terhubung ke database");
      program
        .command("add", "Menambahkan List")
        .argument("<value>", "string")
        .action(({ logger, args }) => {
        logger.info("Sedang Menambahkan");
        (async ()=> {
            const data = await User.build({ updateDate: new Date(), createdAt: new Date(), name_task: args.text, done: 0 });
            data
            .save()
            .then(() => {
                logger.info(args.value + " Berhasil ditambahkan")
            })
            .finally(() => {
                sequelize.close();
            });
            })()
        })
    
        .command("list", "Menampilkan semua list")
        .action(({ logger }) => {
        (async ()=> {
  
            Todo.findAll().then(users => {
            users.forEach(user => console.log(`${user.dataValues.id}. ${user.dataValues.name_task} ${user.dataValues.done?"(Done)":""}`));
        }).catch(function (err) {
            logger.error("Gagal Mendapatkan List, Error: " + err)
            return null;
      
        });
        })()
      
        })
    
        .command("update","update list by id")
        .argument("<id>","String, Id")
        .argument('<value>', 'String Deskripsi')
        .action(({logger,args}) => {
        
            (async () => {
            const id = await User.update(
                  { name_task: args.value },
                  { where: { id: args.id } });
          
            logger.info( "Jumlah diupdate: "+id  )
          
        })()
        })
        .command("delete","Hapus list by id")
        .argument("<id>","String, Id")
        .action(({logger,args}) => {
            (async ()=> {
                let n = await User.destroy({ where: { id: args.id } });
                logger.info(`jumlah dihapus: ${n}`);
      
            sequelize.close();
        })()
        })
        .command("clear","Menghapus semua list")
        .action(({logger}) => {
        (async () => {
            const ok = await yesno({
            question: 'yakin menghapus Semua list? ( ya / gak )',
            yesValues: [ 'ya' ],
        noValues: [ 'gak' ]
        });
        if(ok){
            const n = await User.destroy({ 
            where: {},
            truncate: true
        });
            logger.info(`Seluruh list berhasil dihapus (${m})`)
        }else{
            logger.info(`ga jadi dihapus`)
        }
        sequelize.close();
        })()
        })
        .command("done","Done")
        .argument("<id>","String, Id")
        .action(({logger,args}) => {
        
            (async () => {
            let id = await User.update(
                { done: 1 },
                { where: { id: args.id } });
          
            logger.info( id  )
          
        })()
        })
        .command("undone","undone")
        .argument("<id>","String, Id")
        .action(({logger,args}) => {
            (async () => {
            let id = await User.update(
                { done: 0 },
                { where: { id: args.id } });
            logger.info( id  )
        })()
        })
        program.run()
        } catch (error) {
        console.error("Tidak dapat terhubung ke database", error);
     }
    })();

/* class ControllerTodo{
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

module.exports = ControllerTodo */