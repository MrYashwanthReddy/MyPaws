const express = require("express");
const { posts } = require("../data");

const router = express.Router();

router.route("/new-feed").get(async (req, res) => {
  res.render("home/post-feed", {
    page: { title: "MyPaws" },
    cookie: req.session.user,
  });
});
router.route("/get-feed").get(async (req, res) => {
  try {
    res.send(result);
  } catch (c) {
    res.send([]);
  }
});

router.route("/live").get(async (req, res) => {
  try {
    const result = await posts.getAllPosts();

    res.render("home/home", {
      page: { title: "MyPaws" },
      cookie: req.session.user,
      data: result ? result : false,
    });
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
});

router.route("/post").post(async (req, res) => {
  try {
    let body = req.body;
    const result = await posts.createPost(body);
  } catch (error) {}
});

module.exports = router;
