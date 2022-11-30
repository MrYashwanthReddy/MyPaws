const express = require("express");
const { checkString } = require("../validation");

const router = express.Router();

router
  .route("/lost")
  .get(async (req, res) => {
    res.render("pets/lost", { page: { title: "PET LOST" } });
  })
  .post(async (req, res) => {
    let body = req.body;

    try {
      let animal = checkString(body.animalInput, "animal");
      let bodyType = checkString(body.bodyTypeInput, "body type");
      let breedType = checkString(body.breedType, "breed type");
      let color = checkString(body.colorInput, "color");
      let colar = checkString(body.colar, "colar");
      let earType = checkString(body.earTypeInput, "ear type");
      let gender = checkString(body.genderInput, "gender");
      let hairType = checkString(body.hairTypeInput, "hair type");
      let height = checkString(body.heightInput, "height");
    } catch (error) {
      res.status(error.status).render("pets/lost", {
        ...body,
        error: error.msg,
        page: { title: "PET LOST" },
      });
    }

    console.log(body);
  });

router.route("/found").get(async (req, res) => {
  res.render("pets/found", { page: { title: "PET FOUND" } });
});

module.exports = router;
