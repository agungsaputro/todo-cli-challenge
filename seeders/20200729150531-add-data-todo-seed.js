'use strict';

const todo = require("../models/todo");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'todo',
      [
        {
          nama_task: 'Jogging jam 5:00 WIB',
          done:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_task: ' Makan di Warteg Bu Ita',
          done:0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama_task: 'Nge-gym di Celfit (DONE)',
          done:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert('todo',null,{})
  }
};
