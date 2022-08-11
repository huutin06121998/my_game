const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
  }
);
exports.sequelize = sequelize;

const Room = require("./Room")(sequelize);
const Score = require("./Score")(sequelize);
const RoomPlayer = require("./RoomPlayer")(sequelize);

// Room
Room.hasMany(RoomPlayer, { foreignKey: "room_code" });

//Score
Score.belongsTo(RoomPlayer, { foreignKey: "room_player_id" });

// RoomPlayer
RoomPlayer.belongsTo(Room, { foreignKey: "room_code" });
RoomPlayer.hasMany(Score, { foreignKey: "room_player_id" });

// Export
exports.Room = Room;
exports.Score = Score;
exports.RoomPlayer = RoomPlayer;
