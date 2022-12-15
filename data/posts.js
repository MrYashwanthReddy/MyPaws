const {ObjectId} = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const {validValue, checkString, checkId} = require("../validation");
const {getUserById} = require("./users");
const posts = mongoCollections.posts;

const getAllPosts = async (queryDoc) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw {status: 500, msg: "Error: Server Error"};
  }
  //const data = await liveFeedCollection.find({}).toArray();
  const data = await postsCollection
    .find({})
    .sort({postDate: -1})
    .skip(queryDoc)
    .limit(10)
    .toArray();

  queryDoc = queryDoc + 10;

  return {posts: data, queryDoc: queryDoc};
};

const getPostsCount = async () => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw {status: 500, msg: "Error: Server Error"};
  }

  const data = await postsCollection.count();

  return data;
};

const createPost = async ({content, image, userId, title}) => {
  try {
    const postsCollection = await posts();

    content = validValue(content);
    userId = validValue(userId);
    title = validValue(title);

    content = checkString(content);
    userId = checkString(userId);
    title = checkString(title);

    userId = checkId(userId);

  const newPost = {
    content,
    userId,
    image,
    title,
    postDate: new Date(),
    likes: [],
    comments: [],
  };

    const insertInfo = await postsCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: 400, msg: "Could not add feed"};

    return {status: 200, insertedPost: true};
  } catch (error) {
    throw {status: 500, msg: "Error: Server Error"};
  }
};

const likePost = async (postId, userId) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

  let post = await postsCollection.findOne({ _id: ObjectId(postId) });

  //var item = post.likes.find(item => item.id === ObjectId(userId));
  if (post.likes == 0) {
    post.likes = [];
  }
  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((e) => e !== userId);
  } else {
    post.likes.push(userId);
  }

  const insertInfo = await postsCollection.updateOne(
    { _id: ObjectId(postId) },
    { $set: { likes: post.likes } }
  );

  if (!insertInfo.acknowledged || !insertInfo.modifiedCount) {
    throw { status: 400, msg: "Could not add feed" };
  }

  return { status: 200, liked: true };
};

const commentPost = async (req, postId, userId, comment) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

  let post = await postsCollection.findOne({ _id: ObjectId(postId) });
  //var item = post.likes.find(item => item.id === ObjectId(userId));
  if (post.comments == 0) {
    post.comments = [];
  }

  post.comments.push({
    commentId: new ObjectId(),
    comment: comment,
    commentDate: new Date(),
    userId: userId,
  });

  const insertInfo = await postsCollection.updateOne(
    { _id: ObjectId(postId) },
    { $set: { comments: post.comments } }
  );

  if (!insertInfo.acknowledged || !insertInfo.modifiedCount) {
    throw { status: 400, msg: "Could not add comment" };
  }

  return { status: 200, comment: true, username: req.session.user._id };
};

const commentDelete = async (req, postId, userId, commentId) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }

  let post = await postsCollection.findOne({ _id: ObjectId(postId) });
  //var item = post.likes.find(item => item.id === ObjectId(userId));
  if (post.comments == 0) {
    post.comments = [];
  }

  post.comments.forEach( (c, i) => {
    if( c.commentId == ObjectId(commentId) ){
      if(c.userId == userId){
        c.splice(i,1);
      }
    }
  });

  const insertInfo = await postsCollection.updateOne(
    { _id: ObjectId(postId) },
    { $set: { comments: post.comments } }
  );

  if (!insertInfo.acknowledged || !insertInfo.modifiedCount) {
    throw { status: 400, msg: "Could not delete comment" };
  }

  return { status: 200, comment: true, username: req.session.user._id };
};

module.exports = {
  getAllPosts,
  createPost,
  getPostsCount,
  likePost,
  commentPost,
  commentDelete,
};
