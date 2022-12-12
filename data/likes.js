const { ObjectID } = require("bson");
const { ObjectId } = require("mongodb");
const mongoCollections = require("./../config/mongoCollections");

const posts = mongoCollections.posts;
//const likes = mongoCollections.likes;

//DONT CREATE NEW LIKES COLLECTION

//PATCH THE LIKES IN POSTS DATA

//STORE LIKE as ARRAY of USER_ID

//IF USER ALREADY LIKED THE POST SEND ERROR

// const createLike = async (userId, postId) => {
//   let likesCollection;
//   try {
//     likesCollection = await likes();
//   } catch (error) {
//     throw { status: 500, msg: "Error: Server Error" };
//   }

//   const data = await likesCollection
//     .find({
//       userId: ObjectId(userId),
//       postId: ObjectId(postId),
//     })
//     .toArray();

//   if (data.length == 0) {
//     const newLike = {
//       userId: ObjectId(userId),
//       postId: ObjectId(postId),
//       date: new Date(),
//     };
//     const insertInfo = await likesCollection.insertOne(newLike);
//     if (!insertInfo.acknowledged || !insertInfo.insertedId)
//       throw { status: 400, msg: "Could not add feed" };
//     const newId = insertInfo.insertedId.toString();
//     //const newUser = await getUserById(newId);
//     return { status: 200, insertedUser: true };
//   } else {
//     data = await likesCollection.remove({
//       userId: ObjectId(userId),
//       postId: ObjectId(postId),
//     });
//     return { status: 200 };
//   }
// };

// module.exports = {
//   createLike,
// };
