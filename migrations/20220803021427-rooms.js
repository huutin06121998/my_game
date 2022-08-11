"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const STATUS_END = 0;
    const STATUS_CREATED = 1;
    const STATUS_PLAYING = 2;
    await queryInterface.createTable("rooms", {
      id: {
        type: Sequelize.BIGINT,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: STATUS_CREATED,
        validate: {
          isIn: [[STATUS_END, STATUS_CREATED, STATUS_PLAYING]],
        },
      },
      created_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("rooms");
  },
};
