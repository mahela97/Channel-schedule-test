const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const TIME = 1000 * 60 * 10;

dotenv.config();

//Init express
const app = express();

app.use(express.static("public"));
const public_directory = path.join(__dirname, "./public");
app.use(express.static(public_directory));
hbs.registerPartials(__dirname + "/views/partials");

//Set view engine
app.set("view engine", "hbs");

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: "session",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      maxAge: TIME,
    },
  })
);

//Routes
app.use("/", require("./routes"));

//Listening to the port
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

module.exports = app;
