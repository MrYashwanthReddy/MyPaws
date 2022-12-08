const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

const getAllPosts = async (queryDoc) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
  //const data = await liveFeedCollection.find({}).toArray();
  const data = await postsCollection
    .find({})
    .skip(queryDoc)
    .limit(10)
    .toArray();

  queryDoc = queryDoc + 10;

  return { posts: data, queryDoc: queryDoc };
};

const getPostsCount = async () => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

  const data = await postsCollection.count();

  return data;
};

const createPost = async (data) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

  const insertInfo = await postsCollection.insertOne(data);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not add feed" };

  const newId = insertInfo.insertedId.toString();
  //const newUser = await getUserById(newId);

  return { status: 200, insertedUser: true };
};

module.exports = {
  getAllPosts,
  createPost,
  getPostsCount,
};
