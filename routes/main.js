const express = require("express");

const router = express.Router();

const path = require("path");
const { validValue } = require("../validation");

router.route("/").get((req, res) => {
  res.sendFile(path.resolve("static/homepage.html"));
});

router
  .route("/login")
  .get((req, res) => {
    res.render("users/login", { page: { title: "Login" } });
  })
  .post((req, res) => {
    let body = req.body;
    try {
      let email = validValue(body.email, "EMAIL");
      let pass = validValue(body.password, "PASSWORD");
    } catch (error) {
      res.status(error.status).render("users/login", {
        ...body,
        error: error.msg,
        page: { title: "Login" },
      });
    }
  });

router
  .route("/register")
  .get((req, res) => {
    res.render("users/register", { page: { title: "Registration" } });
  })
  .post((req, res) => {
    let body = req.body;
    try {
      let firstName = validValue(body.firstName, "FIRST NAME");
      let lastName = validValue(body.lastName, "LAST NAME");
      let email = validValue(body.email, "EMAIL");
    } catch (error) {
      res.status(error.status).render("users/register", {
        ...body,
        error: error.msg,
        page: { title: "Login" },
      });
    }
  });

module.exports = router;
