const express = require("express");
const { ObjectId } = require("mongodb");
const axios = require("axios");

const settings = require("../config/settings");
const { reviews } = require("../data");
const { validValue, checkString, checkRating } = require("../validation");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const searchConfig = settings.petStoreConfig;

      let location = req.session.location
        ? req.session.location
        : searchConfig.HobokenLocation;

      const config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${searchConfig.radius}&type=pet_store&key=AIzaSyCCBTWUmMlVv-dt5VvetyGkH9mdbVL6iy4`,
        headers: {},
      };

      const { data } = await axios(config);
      res.render("store/store", {
        page: { title: "Pet Stores" },
        cookie: req.session.user,
        data: data.results,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.msg });
    }
  })
  .post(async (req, res) => {
    req.session.location = req.body.location ? req.body.location : false;
    res.redirect("/pet-stores");
  });

router.route("/review/:placeId").get(async (req, res) => {
  try {
    const { placeId } = req.params;

    const config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCCBTWUmMlVv-dt5VvetyGkH9mdbVL6iy4`,
      headers: {},
    };

    const { data } = await axios(config);
    data.result.plus_code.global_code =
      data.result.plus_code.global_code.replace("+", "%2B");

    data.result.reviews = await reviews.getAllReviews(data.result.placeId);
    data.result.existReview = await reviews.existReview(req.session.user._id);

    res.render("store/review", {
      page: { title: "Pet Stores Review" },
      cookie: req.session.user,
      data: data.result,
    });
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
});

router
  .route("/review-post/:placeId/:reviewId")
  .get(async (req, res) => {
    try {
      const { placeId, reviewId } = req.params;

      const results =
        reviewId === "0" ? undefined : await reviews.getReview(reviewId);

      res.render("store/post", {
        page: { title: "Post Pet Store Review" },
        cookie: req.session.user,
        data: { ...results, placeId, _id: reviewId },
      });
    } catch (error) {
      res.status(error.status).json({ error: error.msg });
    }
  })
  .post(async (req, res) => {
    try {
      const { placeId, reviewId } = req.params;
      const data = req.body;

      validValue(data.rating, "Rating");
      validValue(data.comment, "Comment");

      checkRating(data.rating);
      checkString(data.comment, "Comment");

      data.userId = new ObjectId(req.session.user._id);
      data.placeId = placeId;
      if (reviewId === "0") {
        const result = await reviews.createReview(data);
        if (result.insertedReview)
          return res.redirect(`/pet-store/review/${placeId}`);
      } else {
        const result = await reviews.updateReview(reviewId, data);
        if (result.updatedReview)
          return res.redirect(`/pet-store/review/${placeId}`);
      }
    } catch (error) {
      res.status(error.status).json({ error: error.msg });
    }
  });

router.route("/review-delete/:placeId/:reviewId").get(async (req, res) => {
  try {
    const { placeId, reviewId } = req.params;

    const result = await reviews.deleteReview(reviewId);
    if (result.deletedReview)
      return res.redirect(`/pet-store/review/${placeId}/`);
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
});
module.exports = router;
