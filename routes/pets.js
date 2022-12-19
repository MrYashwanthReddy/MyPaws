const express = require("express");
const xss = require("xss");
const { pets } = require("../data");
const {
  checkString,
  validValue,
  checkEmail,
  checkBoolean,
  checkPasswordString,
  checkAlphabets,
  checkNumbers,
  checkAnimal,
  checkGender,
  checkAlphabetsWithSpaces,
} = require("../validation");
const { route } = require("./users");

const router = express.Router();

router.route("/match").post(async (req, res) => {
  const result = await pets.makeMatch();

  res.send(result);
});

router.route("/report").get(async (req, res) => {
  let error = xss(req.query.e);
  let errorMsg;
  if (error == "p") {
    errorMsg = "Error: Found/Lost animal should be either dog or cat";
  }

  let sessionUser = xss(req.session.user) ? req.session.user : false;
  res.render("pets/report", {
    page: { title: "My Paws | REPORT" },
    cookie: sessionUser,
    error: error ? errorMsg : false,
  });
});

router.route("/lost/:animal").get(async (req, res) => {
  let animal = xss(req.params.animal);

  if (animal != "dog" && animal != "cat") {
    res.redirect("/pets/report?e=p");
  }

  let sessionUser = xss(req.session.user) ? req.session.user : false;

  res.render("pets/lost", {
    page: { title: "PET LOST", animal: animal },
    cookie: sessionUser,
  });
});

router.route("/lost").post(async (req, res) => {
  try {
    let email = validValue(xss(req.body.email), "email");
    let animal = validValue(xss(req.body.animalInput), "animal");
    let bodyType = validValue(xss(req.body.bodyTypeInput), "body type");
    let breedType = validValue(xss(req.body.breedInput), "breed type");
    let color = validValue(xss(req.body.colorInput), "color");
    let collar = validValue(xss(req.body.collarInput), "collar");
    let earType = validValue(xss(req.body.earTypeInput), "ear type");
    let gender = validValue(xss(req.body.genderInput), "gender");
    let hairType = validValue(xss(req.body.hairTypeInput), "hair type");
    let height = validValue(xss(req.body.heightInput), "height");

    animal = checkString(animal, "animal");
    bodyType = checkString(bodyType, "body type");
    breedType = checkString(breedType, "breed type");
    color = checkString(color, "color");
    collar = checkString(collar, "collar");
    earType = checkString(earType, "ear type");
    gender = checkPasswordString(gender, "gender");
    hairType = checkString(hairType, "hair type");
    height = checkString(height, "height");

    animal = checkAnimal(animal);
    bodyType = checkAlphabets(bodyType, "body type");
    breedType = checkAlphabetsWithSpaces(breedType, "breed type");
    color = checkAlphabets(color, "color");
    collar = checkBoolean(collar, "collar");
    earType = checkAlphabets(earType, "ear type");
    gender = checkGender(gender);
    hairType = checkAlphabets(hairType, "hair type");
    height = checkNumbers(height, "height");

    const lostPet = {
      animal: animal,
      gender: gender,
      color: color,
      collar: collar,
      height: height,
      bodyType: bodyType,
      breedType: breedType,
      hairType: hairType,
      earType: earType,
    };

    const result = await pets.createLostPet(lostPet);

    if (result.insertedPet) {
      res.redirect("/live");
    }
  } catch (error) {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.status(error.status).render("pets/lost", {
      ...req.body,
      error: error.msg,
      page: { title: "PET LOST" },
      cookie: sessionUser,
    });
  }
});

router.route("/found/:animal").get(async (req, res) => {
  let animal = xss(req.params.animal);
  if (animal != "dog" && animal != "cat") {
    res.redirect("pets/report?e=p");
  }

  let sessionUser = xss(req.session.user) ? req.session.user : false;
  res.render("pets/found", {
    page: { title: "PET FOUND", animal: animal },
    cookie: sessionUser,
  });
});

router.route("/found").post(async (req, res) => {
  try {
    let firstName = validValue(xss(req.body.firstName), "name");
    let lastName = validValue(xss(req.body.lastName), "name");

    let email = validValue(xss(req.body.email), "email");
    let animal = validValue(xss(req.body.animalInput), "animal");
    let bodyType = validValue(xss(req.body.bodyTypeInput), "body type");
    let breedType = validValue(xss(req.body.breedInput), "breed type");
    let color = validValue(xss(req.body.colorInput), "color");
    let collar = validValue(xss(req.body.collarInput), "collar");
    let earType = validValue(xss(req.body.earTypeInput), "ear type");
    let gender = validValue(xss(req.body.genderInput), "gender");
    let hairType = validValue(xss(req.body.hairTypeInput), "hair type");
    let height = validValue(xss(req.body.heightInput), "height");

    firstName = checkString(firstName, "first name");
    lastName = checkString(lastName, "last name");
    email = checkString(email, "email");
    animal = checkString(animal, "animal");
    bodyType = checkString(bodyType, "body type");
    breedType = checkString(breedType, "breed type");
    color = checkString(color, "color");
    collar = checkString(collar, "collar");
    earType = checkString(earType, "ear type");
    gender = checkPasswordString(gender, "gender");
    hairType = checkString(hairType, "hair type");
    height = checkString(height, "height");

    firstName = checkAlphabets(firstName, "first name");
    lastName = checkAlphabets(lastName, "last name");
    email = checkEmail(email);
    animal = checkAnimal(animal);
    bodyType = checkAlphabets(bodyType, "body type");
    breedType = checkAlphabetsWithSpaces(breedType, "breed type");
    color = checkAlphabets(color, "color");
    collar = checkBoolean(collar, "collar");
    earType = checkAlphabets(earType, "ear type");
    gender = checkGender(gender);
    hairType = checkAlphabets(hairType, "hair type");
    height = checkNumbers(height, "height");

    const foundPet = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      animal: animal,
      gender: gender,
      color: color,
      collar: collar,
      height: height,
      bodyType: bodyType,
      breedType: breedType,
      hairType: hairType,
      earType: earType,
    };

    const result = await pets.createFoundPet(foundPet);

    if (result.insertedPet) {
      res.redirect("/live");
    }
  } catch (error) {
    let sessionUser = xss(req.session.user) ? req.session.user : false;
    res.status(error.status).render("pets/found", {
      ...req.body,
      error: error.msg,
      page: { title: "PET FOUND" },
      cookie: sessionUser,
    });
  }
});

module.exports = router;
