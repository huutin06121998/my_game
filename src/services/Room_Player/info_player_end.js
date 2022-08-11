const Sequelize = require("sequelize");
const Room_Player = require("../../../models").RoomPlayer;
const Room = require("../../../models").Room;
const Score = require("../../../models").Score;
const pick = require("lodash.pick");
const Op = Sequelize.Op;

module.exports = async function infoPlayerEndPlay(roomCode) {
  const dataPlayerEnd = await Room_Player.findAll({
    raw: true,
    attributes: ["id", "room_code", "player_id"],
    include: [
      {
        raw: true,
        model: Score,
        required: true,
        attributes: ["id", "scores"],
      },
    ],
    where: {
      roomCode: roomCode,
    },
    group: ["room_code"],
  });
  return dataPlayerEnd[0];
};
