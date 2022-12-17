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

const createPost = async (content, image, userId, title) => {
  try {
    const walkersCollection = await walkers();
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

    const insertInfo = await walkersCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: 400, msg: "Could not add feed"};

    return {status: 200, insertedPost: true};
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
}

const commentPost = async (postId, userId, comment) => {
  try {
    const walkersCollection = await walkers();
    let post = await walkersCollection.findOne({ _id: ObjectId(postId) });

    if (post.comments == 0) {
      post.comments = [];
    }

    post.comments.push({
      commentId: ObjectId(),
      comment: comment,
      commentDate: new Date(),
      userId: userId,
    });

    const updateInfo = await walkersCollection.updateOne(
      { _id: ObjectId(postId) },
      { $set: { comments: post.comments } }
    );

    if (!updateInfo.acknowledged || !updateInfo.modifiedCount) {
      throw { status: 400, msg: "Could not add comment" };
    }

    return { status: 200, comment: true };
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

};

module.exports = {
  getAllPosts,
  getPostsCount,
  createPost,
  commentPost,
}