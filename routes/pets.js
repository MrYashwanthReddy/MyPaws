const express = require("express");
const { pets } = require("../data");
const { checkString, validValue, checkImage } = require("../validation");

const router = express.Router();

router
  .route("/lost")
  .get(async (req, res) => {
    res.render("pets/lost", {
      page: { title: "PET LOST" },
      cookie: req.session.user ? req.session.user : false,
    });
  })
  .post(async (req, res) => {
    let body = req.body;

    try {
      let animal = validValue(body.animalInput, "animal");
      let bodyType = validValue(body.bodyTypeInput, "body type");
      let breedType = validValue(body.breedInput, "breed type");
      let color = validValue(body.colorInput, "color");
      let colar = validValue(body.colarInput, "colar");
      let earType = validValue(body.earTypeInput, "ear type");
      let gender = validValue(body.genderInput, "gender");
      let hairType = validValue(body.hairTypeInput, "hair type");
      let height = validValue(body.heightInput, "height");
      let imageInput = checkImage(req.files?.imageInput);

      animal = checkString(body.animalInput, "animal");
      bodyType = checkString(body.bodyTypeInput, "body type");
      breedType = checkString(body.breedInput, "breed type");
      color = checkString(body.colorInput, "color");
      colar = checkString(body.colarInput, "colar");
      earType = checkString(body.earTypeInput, "ear type");
      gender = checkString(body.genderInput, "gender");
      hairType = checkString(body.hairTypeInput, "hair type");
      height = checkString(body.heightInput, "height");
      body.imageInput = imageInput.data;
      
      const result = await pets.createLostPet(body);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      res.status(error.status).render("pets/lost", {
        ...body,
        error: error.msg,
        page: { title: "PET LOST" },
        cookie: req.session.user ? req.session.user : false,
      });
    }
  });

router
  .route("/found")
  .get(async (req, res) => {
    res.render("pets/found", {
      page: { title: "PET FOUND" },
      cookie: req.session.user ? req.session.user : false,
    });
  })
  .post(async (req, res) => {
    let body = req.body;

    try {
      let name = validValue(body.nameInput, "name");
      let email = validValue(body.emailInput, "email");
      let animal = validValue(body.animalInput, "animal");
      let bodyType = validValue(body.bodyTypeInput, "body type");
      let breedType = validValue(body.breedInput, "breed type");
      let color = validValue(body.colorInput, "color");
      let colar = validValue(body.colarInput, "colar");
      let earType = validValue(body.earTypeInput, "ear type");
      let gender = validValue(body.genderInput, "gender");
      let hairType = validValue(body.hairTypeInput, "hair type");
      let height = validValue(body.heightInput, "height");
      let imageInput = checkImage(req.files?.imageInput);

      name = checkString(body.nameInput, "name");
      email = checkString(body.emailInput, "email");
      animal = checkString(body.animalInput, "animal");
      bodyType = checkString(body.bodyTypeInput, "body type");
      breedType = checkString(body.breedInput, "breed type");
      color = checkString(body.colorInput, "color");
      colar = checkString(body.colarInput, "colar");
      earType = checkString(body.earTypeInput, "ear type");
      gender = checkString(body.genderInput, "gender");
      hairType = checkString(body.hairTypeInput, "hair type");
      height = checkString(body.heightInput, "height");
      body.imageInput = imageInput.data;

      const result = await pets.createFoundPet(body);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      res.status(error.status).render("pets/found", {
        ...body,
        error: error.msg,
        page: { title: "PET FOUND" },
        cookie: req.session.user ? req.session.user : false,
      });
    }
  });

module.exports = router;
