const { ObjectId } = require("mongodb");

const mongoCollections = require("../config/mongoCollections");
const { validValue, checkString, checkId } = require("../validation");
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

const createPost = async (content, image, userId, title) => {
  try {
    const adoptionsCollection = await adoptions();
    validValue(content, "Content");
    validValue(userId, "User Id");
    validValue(title, "Title");

    checkString(content);
    checkString(userId);
    checkString(title);

    checkId(userId);

    const newPost = {
      content,
      userId,
      image,
      title,
      postDate: new Date(),
      comments: [],
    };

    const insertInfo = await adoptionsCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: 400, msg: "Could not add feed"};

    return {status: 200, insertedPost: true};
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
}

module.exports = {
  getAllPosts,
  getPostsCount,
  createPost,
}