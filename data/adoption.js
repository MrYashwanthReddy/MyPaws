const { ObjectId } = require("mongodb");

const mongoCollections = require("../config/mongoCollections");
const adoptions = mongoCollections.adoptions;

const getAllPosts = async (queryDoc) => {
  try {
    const adoptionsCollection = await adoptions();
    //const data = await liveFeedCollection.find({}).toArray();
    const data = await adoptionsCollection
      .aggregate([
        { 
          $addFields: { 
            comments: { $ifNull : [ "$comments", [] ] }    
          } 
        },
        {
          $lookup: {
            from: "users",
            localField: "comments.userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { 
          $addFields: {
            comments: {
              $map: {
                input: "$comments",
                in: {
                  "$mergeObjects": [
                    "$$this",
                    { 
                      "userInfo": {
                        "$arrayElemAt": [
                          "$user",
                          { 
                            "$indexOfArray": [
                              "$user._id",
                              "$$this.userId"
                            ] 
                          }
                        ]
                      } 
                    }
                  ]
                }
              }
            }
          } 
        },
        { $project: { user: 0 } }
      ])
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

const commentPost = async (postId, userId, comment) => {
  try {
    const adoptionsCollection = await adoptions();
    let post = await adoptionsCollection.findOne({ _id: ObjectId(postId) });

    if (post.comments == 0) {
      post.comments = [];
    }

    post.comments.push({
      commentId: ObjectId(),
      comment: comment,
      commentDate: new Date(),
      userId: userId,
    });

    const updateInfo = await adoptionsCollection.updateOne(
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