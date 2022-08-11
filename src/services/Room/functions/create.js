const Room = require("../../../../models").Room;
const pick = require("lodash.pick");
const Op = Sequelize.Op;

const PUBLIC_FIELDS = ["id", "name", "code", "status"];
module.exports = async function roomCreate(code, name) {
  // Check data invalid
  if (!name) {
    throw new Error(`BadRequest : Room name cannot be blank.`);
  }

  // Check code duplicate
  const where = {
    [Op.and]: [{ code: code }, { status: STATUS_CREATED }],
  };

  let foundCode = await Room.findOne({
    where,
  });

  if (foundCode) {
    throw new Error(`ConflictException : Code has duplicated`);
  }

  const props = {
    code: code,
    name: name,
  };

  const createRoom = await Room.create(props);
  return pick(createRoom.get({ plain: true }), PUBLIC_FIELDS);
};
