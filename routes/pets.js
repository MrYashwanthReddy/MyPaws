const express = require("express");

const router = express.Router();

router.route("/lost").get(async (req, res) => {
  res.render("pets/lost");
});

router.route("/found").get(async (req, res) => {
  res.render("pets/found");
});

module.exports = router;
