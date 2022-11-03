const express = require("express");

const router = express.Router();

const path = require("path");
const { validValue, checkString } = require("../validation");

router.route("/").get((req, res) => {
  res.render("home/home", { page: { title: "MyPaws" } });
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
      let petName = validValue(body.petName, "PET NAME");
      let petBreed = validValue(body.petBreed, "PET BREED");
      let password = validValue(body.password, "PASSWORD");
      let cpassword = validValue(body.cpassword, "RETYPE PASSWORD");

      firstName = checkString(body.firstName, "FIRST NAME");
      lastName = checkString(body.lastName, "LAST NAME");
      email = checkString(body.email, "EMAIL");
      petName = checkString(body.petName, "PET NAME");
      petBreed = checkString(body.petBreed, "PET BREED");
      password = checkString(body.password, "PASSWORD");
      cpassword = checkString(body.cpassword, "RETYPE PASSWORD");
    } catch (error) {
      res.status(error.status).render("users/register", {
        ...body,
        error: error.msg,
        page: { title: "Login" },
      });
    }
  });

module.exports = router;
