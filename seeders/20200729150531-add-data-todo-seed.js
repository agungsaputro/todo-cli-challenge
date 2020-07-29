'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'todo',
      [
        {
          nama_task: 'Jogging jam 5:00 WIB',
          done:1
        },
        {
          nama_task: ' Makan di Warteg Bu Ita',
          done:0
        },
        {
          nama_task: 'Nge-gym di Celfit (DONE)',
          done:1
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
