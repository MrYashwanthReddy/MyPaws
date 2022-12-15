const express = require("express");
const xss = require("xss");
const { posts, likes, users } = require("../data");
const { getUserById } = require("../data/users");
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

      let queryDoc = req.session.queryDoc
        ? parseInt(xss(req.session.queryDoc))
        : 0;

      if (queryDoc == 1) {
        queryDoc = 0;
      }

      let userId;
      let userName;
      try {
        userId = req.session.user._id;
        userName = req.session.user.firstName;
      } catch (c) {}

      let result = await posts.getAllPosts(queryDoc);
      result.posts.forEach((element) => {
        let binString = JSON.stringify(element.image);
        element.image = "data:image/webp;base64," + JSON.parse(binString);

        element.isLiked = false;
        if (userId) {
          if (element.likes.length != 0) {
            if (element.likes.includes(userId)) {
              element.isLiked = true;
            }
          } else {
            element.likes = [];
          }
        }
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

    let image;

    if (xss(req.files)) {
      image = checkImage(xss(req.files.profileImage));
      image = image.data;
    }

    image = image.data;

    let userId = validValue(body.userId);

    const result = await posts.createPost({ content, image, userId, title });

    res.redirect("/live");
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
});

router.route("/like/:id").post(async (req, res) => {
  try {
    if (!req.session.user) {
      throw { status: 404, msg: "Error: User not found " };
    }
    let userId = xss(req.session.user._id);
    let postId = xss(req.params.id);
    const result = await posts.likePost(postId, userId);
    res.send(result);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.route("/comment").post(async (req, res) => {
  try {
    if (!req.session.user) {
      throw { status: 404, msg: "Error: User not found " };
    }
    let userId = req.session.user._id;
    let postId = req.body.postId;
    let comment = req.body.comment;
    const result = await posts.commentPost(req, postId, userId, comment);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.route("/home").get(async (req, res) => {
  res.status(200).render("home/landing", { page: { title: "Home" } });
});

module.exports = router;
