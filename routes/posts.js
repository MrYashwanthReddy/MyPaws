const express = require("express");
const { posts } = require("../data");

const router = express.Router();

router.route("/post").get(async (req, res) => {
  res.render("home/post", {
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

    let data = [];

    result.forEach((element) => {
      let binString = JSON.stringify(element.image);
      element.image = "data:image/webp;base64," + JSON.parse(binString);
    });

    res.render("home/live", {
      page: { title: "MyPaws" },
      cookie: req.session.user ? req.session.user : false,
      data: result ? result : false,
    });
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
});

router.route("/post").post(async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    const result = await posts.createPost(body);
    res.redirect("/live");
  } catch (error) {}
});

module.exports = router;
