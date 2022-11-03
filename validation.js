module.exports = {
  validValue(input, fieldName) {
    if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };
    return input;
  },
  checkString(strVal, varName) {
    if (!strVal)
      throw { status: 400, msg: `Error: You must supply a ${varName}!` };
    if (typeof strVal !== "string")
      throw { status: 400, msg: `Error: ${varName} must be a string!` };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        status: 400,
        msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
      };
    if (!isNaN(strVal))
      throw {
        status: 400,
        msg: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
      };
    return strVal;
  },
};
