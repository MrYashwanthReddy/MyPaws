const { ObjectId } = require("mongodb");

module.exports = {
  validValue(input, fieldName) {
    if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };
    return input;
  },
  checkString(strVal, varName) {
    if (!strVal) throw { status: 400, msg: `Error: Missing ${varName} input` };
    if (typeof strVal !== "string")
      throw { status: 400, msg: `Error: ${varName} must be a string!` };
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw {
        status: 400,
        msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
      };
    if (!isNaN(strVal) && varName !== 'height')
      throw {
        status: 400,
        msg: `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`,
      };
    return strVal;
  },
  checkId(id) {
    if (!id)
      throw { status: 400, msg: "Error: You must provide an id to search for" };
    if (typeof id !== "string")
      throw { status: 400, msg: "Error: id must be a string" };
    id = id.trim();
    if (id.length === 0)
      throw {
        status: 400,
        msg: "Error: id cannot be an empty string or just spaces",
      };
    if (!ObjectId.isValid(id))
      throw { status: 400, msg: "Error: invalid object ID" };
    return id;
  },

  checkImage(image) {
    if(!image)
      throw {status : 400, msg: "Error: You must provide an image."}
    if (image.size > 5000000)
      throw { status: 413, msg: "Error: File size limit exceeded" };

    return image;
  },

  checkRating(rating) {
    if (parseInt(rating) < 1 || parseInt(rating) > 5)
      throw { status: 400, msg: "Error: invalid rating" };
    return rating;
  }
};
