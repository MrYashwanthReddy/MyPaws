const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

const getAllPosts = async () => {
  try {
    const postsCollection = await posts();
    //const data = await liveFeedCollection.find({}).toArray();
    const data = await postsCollection.find({}).toArray();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (data) => {
  const postsCollection = await posts();

  // let imgs = [];
  // try {
  //   files.forEach((i) => {
  //     imgs.push(i.path);
  //   });
  // } catch (c) {}

  // const feedData = {
  //   userId: ObjectId(userId),
  //   data,
  //   images: JSON.stringify(imgs),
  //   date: new Date().toJSON(),
  //   isActive: true,
  //   reports: "[]",
  //   noOfReport: 0,
  // };

  console.log(data);

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
};
