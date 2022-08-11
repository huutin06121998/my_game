const Sequelize = require("sequelize");
const Room = require("../../../../models").Room;
const pick = require("lodash.pick");
const Op = Sequelize.Op;
const PUBLIC_FIELDS = ["id", "name", "code", "status"];
const STATUS_CREATED = Room.STATUS_CREATED;

module.exports = async function findCode(code) {
  if (!code) {
    throw new Error(`BadRequest : code cannot be blank.`);
  }
  const where = {
    [Op.and]: [{ code: code }, { status: STATUS_CREATED }],
  };

  let foundCode = await Room.findOne({
    where,
  });
  if (!foundCode) {
    throw new Error(`NotFound : Code not found.`);
  }
  return pick(foundCode.toJSON(), PUBLIC_FIELDS);
};
