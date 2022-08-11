const Sequelize = require("sequelize");
const Room_Player = require("../../../models").RoomPlayer;
const Room = require("../../../models").Room;
const Score = require("../../../models").Score;
const Op = Sequelize.Op;
const STATUS_CREATED = 1;

module.exports = async function playerEndPlay(time, roomId, playerId) {
  const playerEnd = await Room_Player.count({
    include: [
      {
        model: Score,
        required: true,
        where: {
          time: {
            [Op.eq]: Number.parseInt(time)
          }
        }
      }
    ],
    include: [
      {
        model: Room,
        required: true,
        where: {
          status: {
            [Op.eq]: STATUS_CREATED
          }
        }
      }
    ],
    group: ["room_id"]
  });

  const countPlayerEnd = playerEnd.map(a => Number.parseInt(a.count));
  return countPlayerEnd[0];
};
