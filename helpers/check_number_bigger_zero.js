module.exports = function (values) {
  return !Number.isInteger(values) || values < 0;
};
