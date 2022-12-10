const express = require("express");
const { posts } = require("../data");
const { validValue, checkImage } = require("../validation");

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

router.route("/").get(async (req, res) => {
  res.redirect("/live");
});

router
  .route("/live")
  .get(async (req, res) => {
    try {
      const count = await posts.getPostsCount();

      let queryDoc = req.session.queryDoc ? parseInt(req.session.queryDoc) : 0;

      if (queryDoc == 1) {
        queryDoc = 0;
      }

      const result = await posts.getAllPosts(queryDoc);

      result.posts.forEach((element) => {
        let binString = JSON.stringify(element.image);
        element.image = "data:image/webp;base64," + JSON.parse(binString);
      });

      res.status(200).render("home/live", {
        page: { title: "MyPaws" },
        cookie: req.session.user ? req.session.user : false,
        data: result ? result.posts : false,
        prev: result.queryDoc >= 20 ? result.queryDoc - 19 : false,
        next: result.queryDoc < count ? result.queryDoc : false,
        queryDoc: result.queryDoc,
      });
    } catch (error) {
      res.status(error.status).json({ error: error.msg });
    }
  })
  .post(async (req, res) => {
    req.session.queryDoc = req.body.queryDoc;
    res.redirect("/live");
  });

router.route("/post").post(async (req, res) => {
  try {
    let body = req.body;

    let title = validValue(body.title);
    let content = validValue(body.content);

    let image = checkImage(req.files.images);

    image = image.data;

    let userId = validValue(body.userId);

    const result = await posts.createPost({ content, image, userId, title });

    res.redirect("/live");
  } catch (error) {}
});

module.exports = router;
