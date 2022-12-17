const { ObjectId } = require("mongodb");

const mongoCollections = require("../config/mongoCollections");
const adoptions = mongoCollections.adoptions;

const getAllPosts = async (queryDoc) => {
  try {
    const adoptionsCollection = await adoptions();
    //const data = await liveFeedCollection.find({}).toArray();
    const data = await adoptionsCollection
      .find()
      .sort({ adoptionDate: -1 })
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
    const adoptionsCollection = await adoptions();
    const data = await adoptionsCollection.count();

    return data;
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
};

module.exports = {
  getAllPosts,
  getPostsCount,
}