const RoomPlayer = require("../../../models").RoomPlayer;
const pick = require("lodash.pick");
const PUBLIC_FIELDS = ["id", "room_id", "player_id"];
module.exports = async function roomPlayerCreate(roomCode, playerId) {
  // Check data invalid
  if (!roomCode) {
    throw new Error(`BadRequest : Room code invalid`);
  }

  const props = {
    room_code: roomCode,
    player_id: playerId,
  };
  const roomPlayer = await RoomPlayer.upsert(props);
  return pick(roomPlayer.get({ plain: true }), PUBLIC_FIELDS);
};
