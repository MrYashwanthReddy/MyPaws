const express = require("express");

const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");

const fileUpload = require("express-fileupload");

const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");

app.use("/public", static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
  })
);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "MyPaws",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 600000 },
  })
);

app.use("/live", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else next();
});

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else next();
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else next();
});
app.use("/profile", (req, res, next) => {
  if (req.session.user) {
    next();
  } else res.redirect("/");
});

app.use("/post", (req, res, next) => {
  if (req.session.user) {
    next();
  } else res.redirect("/");
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Running MyPaws at http://localhost:3000");
});
