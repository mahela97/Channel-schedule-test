const express = require("express");
const router = express.Router();
const user = require("./user");
const staff = require("./staff");
const admin = require("./admin");
const {
  loginPage,
  loginUser,
  logOut,
  recoverPage,
  getEmail,
  checkPage,
  matchQuestions,
  changePasswordPage,
  changePassword,
} = require("../controllers/indexController");

const { registerPage, createUser } = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");
const { isNotLoggedIn } = require("../middleware/isNotLoggedIn");
const { whatType } = require("../middleware/whatType");
const { isValidate } = require("../middleware/isValidate");
const { allowEmail } = require("../middleware/allowEmail");
const { anyPage } = require("../middleware/anyRoute");

//INDEX
router.get(
  "/",
  (req, res, next) => {
    next();
  },
  isLogged,
  whatType
);

//ACCOUNT RECOVERY
router.get("/forgotpw", recoverPage);
router.post("/forgotpw", getEmail);

//QUESTION PAGE
router.get("/check", allowEmail, checkPage);
router.post("/check", matchQuestions);

//CHANGE PASSWORD RECOVER
router.get("/changepw", isValidate, changePasswordPage);
router.post("/changepw", changePassword);

//LOGIN
router.get("/login", isNotLoggedIn, loginPage);
router.post("/login", loginUser);

//REGISTER
router.get("/register", isNotLoggedIn, registerPage);
router.post("/register", createUser);

//LOGOUT
router.get("/logout", logOut);

router.use("/user", user);
router.use("/staff", staff);
router.use("/admin", admin);
router.get("*", anyPage);

module.exports = router;
