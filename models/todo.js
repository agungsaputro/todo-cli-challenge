'use strict';
const{
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model{

  //  const todo = sequelize.define(
  //      'todo',{
  //        nama_task:DataTypes.STRING,
  //       done: DataTypes.BOOLEAN
  //      },
  //      {}
  //  );
  //  todo.associate = function(models){
        static associate(models){

        }
    };
    Todo.init({
      name_task: DataTypes.STRING,
      done : DataTypes.BOOLEAN
    },{
      sequelize,
      rodelName: 'Todo'
    })
    return Todo
};