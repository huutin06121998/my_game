"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DEFAULT_VALUE = 0;
    await queryInterface.createTable("scores", {
      id: {
        type: Sequelize.BIGINT,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      room_player_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      scores: {
        type: Sequelize.SMALLINT,
        defaultValue: DEFAULT_VALUE,
      },
      time: {
        type: Sequelize.SMALLINT,
        defaultValue: DEFAULT_VALUE,
      },
      created_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("scores");
  },
};
