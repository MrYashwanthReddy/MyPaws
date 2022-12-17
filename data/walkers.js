const { ObjectId } = require("mongodb");

const mongoCollections = require("../config/mongoCollections");
const { validValue, checkString, checkId } = require("../validation");
const walkers = mongoCollections.walkers;

const getAllPosts = async (queryDoc) => {
  try {
    const walkersCollection = await walkers();
    //const data = await liveFeedCollection.find({}).toArray();
    const data = await walkersCollection
      .find()
      .sort({ walkerDate: -1 })
      .skip(queryDoc)
      .limit(10)
      .toArray();

    queryDoc = queryDoc + 10;

    return { posts: data, queryDoc: queryDoc };
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
};

const getPostsCount = async () => {
  try {
    const walkersCollection = await walkers();
    const data = await walkersCollection.count();

    return data;
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
};

module.exports = {
  getAllPosts,
  getPostsCount,
}