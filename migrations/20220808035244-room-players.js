"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "room_players",
      {
        id: {
          type: Sequelize.BIGINT,
          unique: true,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        room_code: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        player_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        createdAt: false,
        updatedAt: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("room_players");
  },
};
