const userRoutes = require("./users");

const constructorMethod = (app) => {
  app.use("/api/users", userRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
};

module.exports = constructorMethod;
