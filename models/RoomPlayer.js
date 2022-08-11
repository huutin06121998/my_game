const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
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

  return model;
};
