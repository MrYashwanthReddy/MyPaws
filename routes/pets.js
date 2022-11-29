const express = require("express");

const router = express.Router();

router.route("/lost").get(async (req, res) => {
  res.render("pets/lost", { page: { title: "PET LOST" } });
});

router.route("/found").get(async (req, res) => {
  res.render("pets/found", { page: { title: "PET FOUND" } });
});

module.exports = router;
