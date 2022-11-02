module.exports = {
  validValue(input, fieldName) {
    if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };
    return input;
  },
};
