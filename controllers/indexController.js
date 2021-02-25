const { findUserByEmail, saveNewPassword } = require("../models/userModel");
const {
  userLoginValidation,
  validatePassword,
} = require("./validator/validate");
const bcrypt = require("bcryptjs");
const session = require("express-session");

module.exports = {
  //RENDER LOGIN PAGE

  loginPage: (req, res) => {
    res.render("login", {
      error: req.query.error,
      email: req.query.email,
    });
  },

  //LOGIN USER
  loginUser: async (req, res) => {
    const body = req.body;
    const { error } = userLoginValidation(req.body);
    if (error) {
      return res.redirect(
        `login?error=${error.details[0].message.toUpperCase()}&email=${
          body.email
        }`
      );
    }
    try {
      user = await findUserByEmail(body.email);
      if (!user) {
        return res.redirect(
          `login?error=User is not exist&email=${body.email}`
        );
      }
      const { email, password, type } = user;

      const validPass = await bcrypt.compareSync(body.password, password);

      if (!validPass) {
        return res.redirect(
          `login?error=Email or Password is incorrect
        &email=${body.email}`
        );
      }
      req.session.user_id = email;
      req.session.type = type;
      return res.redirect(`/`);
    } catch (err) {
      return res.redirect(
        `login?error=Cannot connect to the database. Try Again.&email=${body.email}`
      );
    }
  },

  //LogOut user
  logOut: (req, res) => {
    req.session.user_id = null;
    req.session.type = null;
    return res.redirect("/login");
  },

  //RENDER RECOVER PAGE
  recoverPage: (req, res) => {
    return res.render("forgotpw");
  },

  //GET RECOVER EMAIL
  getEmail: async (req, res) => {
    const body = req.body;
    try {
      const user = await findUserByEmail(body.Uname);
      if (!user) {
        return res.redirect(
          `forgotpw?error=User is not exist&email=${body.Uname}`
        );
      }
      req.session.email = user.email;
      req.session.valid = false;
      return res.redirect(`/check`);
    } catch (err) {
      return res.redirect(
        `forgotpw?error=Cannot connect to the database. Try Again&email=${body.Uname}`
      );
    }
  },

  //RENDER CHANGE PASSWORD
  changePasswordPage: (req, res) => {
    return res.render("changepw");
  },

  //CHANGE PASSWORD
  changePassword: async (req, res) => {
    const body = req.body;
    const { error } = validatePassword(body);
    if (error) {
      return res.redirect(`changepw?error=Passwords do not match`);
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    body.email = req.session.email;
    try {
      const update = await saveNewPassword(body, (err, result) => {
        if (err) {
          return res.redirect(`changepw?error=Error`);
        } else {
          return res.redirect("/login");
        }
      });
    } catch (err) {
      return res.redirect(`changepw?error=Cannot connect to the database`);
    }
  },

  //RENDER SECURITY CHECK
  checkPage: (req, res) => {
    return res.render("securitycheck");
  },

  //MATCH SECURITY QUESTIONS
  matchQuestions: async (req, res) => {
    const body = req.body;
    try {
      const user = await findUserByEmail(req.session.email);
      const { pet, color } = user;
      const validPet = await bcrypt.compare(body.secq, pet);
      const validColor = await bcrypt.compare(body.firstq, color);
      if (validPet && validColor) {
        req.session.valid = true;
        return res.redirect("/changepw");
      } else {
        return res.redirect(`forgotpw?error=Answers are not correct`);
      }
    } catch (err) {
      return res.redirect("/changepw?error=Cannot connect to the database");
    }
  },
};
