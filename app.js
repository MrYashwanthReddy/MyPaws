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
    cookie: { maxAge: 6000000 },
  })
);

var hbs = exphbs.create({});

// register new function
hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

app.use("/live", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login?e=l");
  } else {
    next();
  }
});

app.use("/post", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
});

app.use("/auth/login", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else {
    next();
  }
});

app.use("/auth/register", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/live");
  } else {
    next();
  }
});
app.use("/auth/profile", (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/auth/login?e=l");
  } else {
    next();
  }
});

app.use("/pet-stores/review-post", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login?e=l");
  }
});

app.use("/dog-walker", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login?e=l");
  }
});

app.use("/adoption", (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login?e=l");
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Running MyPaws at http://localhost:3000");
});
