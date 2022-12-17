const express = require("express");
const router = express.Router();
const xss = require("xss");

const { validValue, checkImage } = require("../validation");
const { walkers } = require("../data");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const count = await walkers.getPostsCount();

      let queryDoc = req.session.queryDoc
        ? parseInt(xss(req.session.queryDoc))
        : 0;

      if (queryDoc == 1) {
        queryDoc = 0;
      }

      let result = await walkers.getAllPosts(queryDoc);
      result.posts.forEach((element) => {
        let binString = JSON.stringify(element.image);
        element.image = "data:image/webp;base64," + JSON.parse(binString);
      });
      res.render("walker/view", {
        page: { title: "Dog Walker" },
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
    res.render("walker/post", {
      page: { title: "Dog Walker Post" },
      cookie: req.session.user || false
    });
  })
  .post(async (req, res) => {
    const body = xss(req.body);
    try {

      const title = validValue(xss(req.body.title), "Title");
      const content = validValue(xss(req.body.content), "Content");
      const userId = validValue(xss(req.body.userId), "UserId");
  
      let image = checkImage(req.files.images);
      image = image.data;
  
      await walkers.createPost(content, image, userId, title);
  
      res.redirect("/dog-walker");
  
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("walker/post", { 
        ...body, 
        page: { title: "Dog Walker Post" },
        error: error.msg,
        cookie: sessionUser,
      });
    }
  });

module.exports = router;