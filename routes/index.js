const userApiRoutes = require("./usersAPI");

const mainRoutes = require("./main");

const path = require("path");

const constructorMethod = (app) => {
  app.use("/api/users", userApiRoutes);

  app.use("/", mainRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};

module.exports = constructorMethod;
