const express = require("express");
const router = express.Router();
const xss = require("xss");

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

module.exports = router;