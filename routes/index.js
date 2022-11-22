const mainRoutes = require("./users");

const petRoutes = require("./pets");

const path = require("path");

const constructorMethod = (app) => {
  app.use("/", mainRoutes);
  app.use("/pets", petRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};

module.exports = constructorMethod;
