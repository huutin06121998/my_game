const Score = require("../../../models").Score;
const pick = require("lodash.pick");
const PUBLIC_FIELDS = ["id", "room_id", "room_player_id", "scores", "time"];
module.exports = async function roomCreate(time, score, roomPlayerId) {
  // Check data invalid
  if (!time || typeof time !== "number") {
    throw new Error(`BadRequest : Time invalid`);
  }
  if (!score || typeof score !== "number") {
    throw new Error(`BadRequest : Score invalid`);
  }
  if (!roomPlayerId) {
    throw new Error(`BadRequest : Room player id invalid`);
  }

  const props = {
    time: Number.parseInt(time),
    scores: Number.parseInt(score),
    room_player_id: roomPlayerId
  };
  const play = await Score.create(props);
  return pick(play.get({ plain: true }), PUBLIC_FIELDS);
};
