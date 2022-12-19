const express = require("express");
const router = express.Router();
const xss = require("xss");
const { ObjectId } = require("mongodb");

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
        page: { title: "Hire a walker" },
        cookie: req.session.user || false,
        data: result.posts || false,
        prev: result.queryDoc >= 20 ? result.queryDoc - 19 : false,
        next: result.queryDoc < count ? result.queryDoc : false,
        queryDoc: result.queryDoc,
      });
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("walker/view", { 
        page: { title: "Hire a walker" },
        error: error.msg,
        cookie: sessionUser,
      });
    }
  })
  .post(async (req, res) => {
    req.session.queryDoc = req.body.queryDoc;
    res.redirect("/live");
  });

router
  .route("/post")
  .get(async (req, res) => {
    try {
      const data = await walkers.getPost(req.session.user._id);
      res.render("walker/post", {
        page: { title: "Be a walker" },
        data,
        cookie: req.session.user || false
      }); 
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("walker/view", { 
        page: { title: "Hire a walker" },
        error: error.msg,
        cookie: sessionUser,
      });
    }
  })
  .post(async (req, res) => {
    try {

      validValue(xss(req.body.walkWeekStart), "Walking Time Start(Weekdays)");
      validValue(xss(req.body.walkWeekEnd), "Walking Time End(Weekdays)");
      validValue(xss(req.body.walkWeekendStart), "Walking Time Start(Weekend)");
      validValue(xss(req.body.walkWeekendEnd), "Walking Time End(Weekend)");
      validValue(xss(req.body.expMonth), "Experience's Month");
      validValue(xss(req.body.phoneNum), "Phone Number");

      checkImage(req.files.images);

      const image = req.files.images.data;
      const userId = new ObjectId(req.session.user._id);
  
      await walkers.createPost({ ...req.body, image, userId });
  
      res.redirect("/dog-walker");
  
    } catch (error) {
      let sessionUser = xss(req.session.user) ? req.session.user : false;
      res.status(error.status).render("walker/post", { 
        ...body, 
        page: { title: "Hire a walker" },
        error: error.msg,
        cookie: sessionUser,
      });
    }
  });

router.route("/:postId/comment").post(async (req, res) => {
  try {
    const comment = validValue(xss(req.body.comment), "Content");
    const userId = new ObjectId(req.session.user._id);
    const postId = req.params.postId;
    await walkers.commentPost(postId, userId, comment);
    res.redirect("/dog-walker");
  } catch (error) {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.status(error.status).render("walker/view", {
      ...req.body,
      page: { title: "Dog Walker Post" },
      error: error.msg,
      cookie: sessionUser,
    });
  }
});

module.exports = router;
