const express = require("express");

const router = express.Router();

const { users } = require("../data");

router.route("/").get(async (req, res) => {
  try {
    const usersData = await users.getAllUsers();
    res.json(usersData);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.route("/login").get(async (req, res) => {
  try {
    res.render("users/login");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
