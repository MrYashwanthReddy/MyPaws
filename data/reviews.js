const {ObjectId} = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;

const getAllReviews = async (placeId) => {
  try {
    const reviewsCollection = await reviews();
    const data = await reviewsCollection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const existReview = async (userId) => {
  try {
    const reviewsCollection = await reviews();

    const review = await reviewsCollection.findOne({userId: new ObjectId(userId)});

    if (review) return true;

    return false;
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (data) => {
  try {
    const reviewsCollection = await reviews();

    const newData = {
      ...data,
      createdAt: new Date().toJSON(),
    };

    const insertInfo = await reviewsCollection.insertOne(newData);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: 400, msg: "Could not add review"};

    return {status: 200, insertedReview: true};
  } catch (error) {
    console.log(error);
  }
};

const getReview = async (reviewId) => {
  try {
    const reviewsCollection = await reviews();
    const data = await reviewsCollection.findOne({_id: new ObjectId(reviewId)});
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (reviewId, data) => {
  try {
    const reviewsCollection = await reviews();

    const updateInfo = await reviewsCollection.updateOne(
      {_id: new ObjectId(reviewId)},
      {$set: data}
    );

    if (!updateInfo.acknowledged || !updateInfo.modifiedCount)
      throw {status: 400, msg: "Could not update review"};

    return {status: 200, updatedReview: true};
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (reviewId) => {
  try {
    const reviewsCollection = await reviews();

    const deleteInfo = await reviewsCollection.deleteOne({
      _id: new ObjectId(reviewId),
    });

    if (!deleteInfo.acknowledged || !deleteInfo.deletedCount)
      throw {status: 400, msg: "Could not delete review"};

    return {status: 200, deletedReview: true};
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllReviews,
  existReview,
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
