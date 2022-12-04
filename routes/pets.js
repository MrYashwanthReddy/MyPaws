const express = require("express");
const { pets } = require("../data");
const { checkString, validValue } = require("../validation");

const router = express.Router();

router
  .route("/lost")
  .get(async (req, res) => {
    res.render("pets/lost", { page: { title: "PET LOST" } });
  })
  .post(async (req, res) => {
    let body = req.body;

    try {
      let animal = validValue(body.animalInput, "animal");
      let bodyType = validValue(body.bodyTypeInput, "body type");
      let breedType = validValue(body.breedType, "breed type");
      let color = validValue(body.colorInput, "color");
      let colar = validValue(body.colar, "colar");
      let earType = validValue(body.earTypeInput, "ear type");
      let gender = validValue(body.genderInput, "gender");
      let hairType = validValue(body.hairTypeInput, "hair type");
      let height = validValue(body.heightInput, "height");

      animal = checkString(body.animalInput, "animal");
      bodyType = checkString(body.bodyTypeInput, "body type");
      breedType = checkString(body.breedType, "breed type");
      color = checkString(body.colorInput, "color");
      colar = checkString(body.colar, "colar");
      earType = checkString(body.earTypeInput, "ear type");
      gender = checkString(body.genderInput, "gender");
      hairType = checkString(body.hairTypeInput, "hair type");
      height = checkString(body.heightInput, "height");

      const result = await pets.createLostPet(...body);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      res.status(error.status).render("pets/lost", {
        ...body,
        error: error.msg,
        page: { title: "PET LOST" },
      });
    }
  });

router
  .route("/found")
  .get(async (req, res) => {
    res.render("pets/found", { page: { title: "PET FOUND" } });
  })
  .post(async (req, res) => {
    let body = req.body;

    try {
      let name = validValue(body.nameInput, "name");
      let email = validValue(body.emailInput, "email");
      let animal = validValue(body.animalInput, "animal");
      let bodyType = validValue(body.bodyTypeInput, "body type");
      let breedType = validValue(body.breedType, "breed type");
      let color = validValue(body.colorInput, "color");
      let colar = validValue(body.colar, "colar");
      let earType = validValue(body.earTypeInput, "ear type");
      let gender = validValue(body.genderInput, "gender");
      let hairType = validValue(body.hairTypeInput, "hair type");
      let height = validValue(body.heightInput, "height");

      name = checkString(body.nameInput, "name");
      email = checkString(body.emailInput, "email");
      animal = checkString(body.animalInput, "animal");
      bodyType = checkString(body.bodyTypeInput, "body type");
      breedType = checkString(body.breedType, "breed type");
      color = checkString(body.colorInput, "color");
      colar = checkString(body.colar, "colar");
      earType = checkString(body.earTypeInput, "ear type");
      gender = checkString(body.genderInput, "gender");
      hairType = checkString(body.hairTypeInput, "hair type");
      height = checkString(body.heightInput, "height");

      const result = await pets.createFoundPet(...body);

      if (result.insertedPet) {
        res.redirect("/live");
      }
    } catch (error) {
      res.status(error.status).render("pets/found", {
        ...body,
        error: error.msg,
        page: { title: "PET FOUND" },
      });
    }
  });

module.exports = router;
