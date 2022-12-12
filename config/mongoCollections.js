const dbConnection = require("./mongoConnection");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

module.exports = {
  users: getCollectionFn("users"),
  lostpets: getCollectionFn("lostpets"),
  foundpets: getCollectionFn("foundpets"),
  posts: getCollectionFn("posts"),
  reviews: getCollectionFn("reviews"),
  likes: getCollectionFn("likes"),
};
