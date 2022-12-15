const express = require("express");

const router = express.Router();

const { users } = require("../data");
const { validValue, checkString, checkImage } = require("../validation");

const bcrypt = require("bcrypt");
const xss = require("xss");

router.route("/").get(async (req, res) => {
  res.redirect("/live");
});

router
  .route("/login")
  .get((req, res) => {
    let error = xss(req.query.e);
    let errorMsg;
    if (error == "l") {
      errorMsg = "Error: Login Required to Proceed";
    }
    res.render("users/login", {
      page: { title: "Login" },
      error: error ? errorMsg : false,
    });
  })
  .post(async (req, res) => {
    try {
      let email = validValue(xss(req.body.email), "EMAIL");
      let pass = validValue(xss(req.body.password), "PASSWORD");

      email = checkString(email, "EMAIL");
      pass = checkString(pass, "PASSWORD");

      const result = await users.userLogin(email, pass);

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
    let body = xss(req.body);
    try {
      let firstName = validValue(xss(req.body.firstName), "FIRST NAME");
      let lastName = validValue(xss(req.body.lastName), "LAST NAME");
      let age = validValue(xss(req.body.age), "AGE");
      let email = validValue(xss(req.body.email), "EMAIL");
      let petName = validValue(xss(req.body.petName), "PET NAME");
      let petBreed = validValue(xss(req.body.petBreed), "PET BREED");
      let password = validValue(xss(req.body.password), "PASSWORD");
      let cpassword = validValue(xss(req.body.cpassword), "RETYPE PASSWORD");
      let profileImage;
      if (xss(req.files)) {
        profileImage = checkImage(xss(req.files.profileImage));
        profileImage = profileImage.data;
      }

      firstName = checkString(xss(req.body.firstName), "FIRST NAME");
      lastName = checkString(xss(req.body.lastName), "LAST NAME");
      email = checkString(xss(req.body.email), "EMAIL");
      petName = checkString(xss(req.body.petName), "PET NAME");
      petBreed = checkString(xss(req.body.petBreed), "PET BREED");
      password = checkString(xss(req.body.password), "PASSWORD");
      cpassword = checkString(xss(req.body.cpassword), "RETYPE PASSWORD");

      if (password !== cpassword)
        throw { status: 400, msg: "Error: PASSWORD does not match" };

      const salt = await bcrypt.genSalt(10);

      let hashpass = await bcrypt.hash(password, salt);

      const result = await users.createUser({
        ...firstName,
        ...lastName,
        ...age,
        ...email,
        ...petName,
        ...petBreed,
        ...hashpass,
        profileImage: profileImage && profileImage,
      });
      res.redirect("/auth/login");
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
  res.redirect("/live");
});

router.route("/profile").get(async (req, res) => {
  //XSS
  let data = req.session.user;

  if (!data.image) {
    let img = "data:image/webp;base64," + data.profileImage;
    data.image = img;
  }

  // data.profileImage = path;
  res.render("users/profile", {
    page: { title: "Profile" },
    data: data,
    cookie: xss(req.session.user) ? xss(req.session.user) : false,
  });
});

module.exports = router;
