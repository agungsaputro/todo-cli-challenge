'use strict';

module.exports = (sequelize, DataTypes) => {
    const todo = sequelize.define(
        'todo',{
          nama_task:DataTypes.STRING,
          done: DataTypes.BOOLEAN
        },
        {}
    );
    todo.associate = function(models){
        
    };
    return todo;
};