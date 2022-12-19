const express = require("express");
const router = express.Router();
const xss = require("xss");
const { ObjectId } = require("mongodb");

const { validValue, checkImage, checkString } = require("../validation");
const { adoptions } = require("../data");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const count = await adoptions.getPostsCount();

      let queryDoc = req.session.queryDoc
        ? parseInt(xss(req.session.queryDoc))
        : 0;

      if (queryDoc == 1) {
        queryDoc = 0;
      }

      let result = await adoptions.getAllPosts(queryDoc);
      result.posts.forEach((element) => {
        let binString = JSON.stringify(element.image);
        element.image = "data:image/webp;base64," + JSON.parse(binString);
      });
      res.render("adoption/view", {
        page: { title: "Adoption" },
        cookie: req.session.user || false,
        data: result.posts || false,
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

router
  .route("/post")
  .get(async (req, res) => {
    res.render("adoption/post", {
      page: { title: "Adoption Post" },
      cookie: req.session.user || false,
    });
  })
  .post(async (req, res) => {
    try {
      const title = validValue(xss(req.body.title), "Title");
      const content = validValue(xss(req.body.content), "Content");
      const userId = new ObjectId(req.session.user._id);

      checkString(xss(req.body.title), "Title");
      checkString(xss(req.body.content), "Content");

      let image = checkImage(req.files?.images);
      image = image.data;

      await adoptions.createPost(content, image, userId, title);

      res.redirect("/adoption");
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("adoption/post", {
        ...req.body,
        page: { title: "Adoption Post" },
        error: error.msg,
        cookie: sessionUser,
      });
    }
  });

router.route("/:postId/comment").post(async (req, res) => {
  try {
    const comment = validValue(xss(req.body.comment), "Content");
    const userId = req.session.user.firstName;
    const postId = req.params.postId;
    await adoptions.commentPost(postId, userId, comment);
    res.redirect("/adoption");
  } catch (error) {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.status(error.status).render("adoption/view", {
      ...req.body,
      page: { title: "Adoption Post" },
      error: error.msg,
      cookie: sessionUser,
    });
  }
});

module.exports = router;
