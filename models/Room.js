const Sequelize = require("sequelize");

const STATUS_END = 0;
const STATUS_CREATED = 1;
const STATUS_PLAYING = 2;
module.exports = (sequelize) => {
  const model = sequelize.define(
    "rooms",
    {
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
        allowNull: false,
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
    },
    {
      underscored: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  model.STATUS_END = STATUS_END;
  model.STATUS_PLAYING = STATUS_PLAYING;
  model.STATUS_CREATED = STATUS_CREATED;

  return model;
};
