const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const DEFAULT_VALUE = 0;
  const model = sequelize.define(
    "scores",
    {
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
    },
    {
      underscored: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return model;
};
