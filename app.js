const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");

app.use("/public", static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("Running MyPaws at http://localhost:3000");
});
