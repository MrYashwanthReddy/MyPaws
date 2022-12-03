const mainRoutes = require("./users");

const petRoutes = require("./pets");

const postRoutes = require("./posts");

const constructorMethod = (app) => {
  app.use("/", mainRoutes);
  app.use("/pets", petRoutes);
  app.use("/", postRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
