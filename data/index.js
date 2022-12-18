const usersData = require("./users");
const petsData = require("./pets");
const postsData = require("./posts");
const reviewData = require("./reviews");
const likeData = require("./likes");
const walkerData = require("./walkers");
const adoptionData = require("./adoption");

module.exports = {
  users: usersData,
  pets: petsData,
  posts: postsData,
  reviews: reviewData,
  likes: likeData,
  walkers: walkerData,
  adoptions: adoptionData,
};
