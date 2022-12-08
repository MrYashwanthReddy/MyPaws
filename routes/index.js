const mainRoutes = require("./users");

const petRoutes = require("./pets");

const postRoutes = require("./posts");

const constructorMethod = (app) => {
  app.use("/auth", mainRoutes);
  app.use("/pets", petRoutes);
  app.use("/", postRoutes);

  // app.use("*", (req, res) => {
  //   res.redirect("/live");
  // });
};

module.exports = constructorMethod;
