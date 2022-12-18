const mainRoutes = require("./users");

const petRoutes = require("./pets");

const postRoutes = require("./posts");

const storeRoutes = require("./stores");

const walkerRoutes = require("./walker");

const adoptionRoutes = require("./adoption");

const constructorMethod = (app) => {
  app.use("/auth", mainRoutes);
  app.use("/pets", petRoutes);
  app.use("/pet-stores", storeRoutes);
  app.use("/dog-walker", walkerRoutes);
  app.use("/adoption", adoptionRoutes);
  app.use("/", postRoutes);

  app.use("*", (req, res) => {
    res.redirect("/live");
  });
};

module.exports = constructorMethod;
