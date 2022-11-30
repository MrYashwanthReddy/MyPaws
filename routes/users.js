const express = require("express");

const router = express.Router();

const path = require("path");
const { users } = require("../data");
const { validValue, checkString } = require("../validation");

const bcrypt = require("bcrypt");

router.route("/").get(async (req, res) => {
  res.redirect("/live");
});

router.route("/live").get(async (req, res) => {
  res.render("home/home", {
    page: { title: "MyPaws" },
    cookie: req.session.user,
  });
});

router
  .route("/login")
  .get((req, res) => {
    const data = users.getAllUsers();
    res.render("users/login", { page: { title: "Login" } });
  })
  .post(async (req, res) => {
    let body = req.body;
    try {
      let email = validValue(body.email, "EMAIL");
      let pass = validValue(body.password, "PASSWORD");

      email = checkString(body.email, "EMAIL");
      pass = checkString(body.password, "PASSWORD");

      const result = await users.userLogin(email, pass);

      console.log(result);

      if ((result.status = 200)) {
        req.session.user = {
          auth: true,
          ...result,
        };
      }

      res.redirect("/live");
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
  .post(async (req, res) => {
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

      if (password !== cpassword)
        throw { status: 400, msg: "Error: PASSWORD does not match" };

      const salt = await bcrypt.genSalt(10);

      let hashpass = await bcrypt.hash(password, salt);

      const result = await users.createUser(
        firstName,
        lastName,
        email,
        petName,
        petBreed,
        hashpass
      );
      res.redirect("/login");
    } catch (error) {
      res.status(error.status).render("users/register", {
        ...body,
        error: error.msg,
        page: { title: "Login" },
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.route("/profile").get(async (req, res) => {
  let data = req.session.user;
  console.log(data);
  res.render("users/profile", { page: { title: "Profile" }, data: data });
});

module.exports = router;
