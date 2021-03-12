const {
  createRegisteredUser,
  saveNewPassword,
} = require("../models/userModel");

const {
  userRegisterValidation,
  validatePassword,
} = require("./validator/validate");

const bcrypt = require("bcryptjs");

module.exports = {
  //User Homepage
  userHomePage: (req, res) => {
    res.render("user/home-user");
  },

  //Rendering the register page
  registerPage: (req, res) => {
    res.render("register", {
      error: req.query.error,
      username: req.query.email,
      email: req.query.email,
    });
  },

  //Registering a user
  createUser: async (req, res) => {
    const body = req.body;
    const { error } = userRegisterValidation(req.body);
    if (error) {
      return res.redirect(
        `register?error=${error.details[0].message.toUpperCase()}
        &email=${req.body.email}
        &user_id=${req.body.user_id}`
      );
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    body.firstq = await bcrypt.hash(body.firstq, salt);             
    body.secq = await bcrypt.hash(body.secq, salt);
    try{
      const result = await createRegisteredUser(body);
      return res.redirect("/login");
    }catch (err){
      return res.redirect(
          `register?error=Email is already exist&email=${body.email}&user_id=${body.user_id}`
        );
      
    }
    
    
  },

  //ACCOUNT UPDATE PAGE
  accountUpdatePage: (req, res) => {
    return res.render(`user/accountupdates-user`, { status: req.query.status });
  },

  //CHANGE PASSWORD
  accountUpdate: async (req, res) => {
    const body = req.body;
    const { error } = validatePassword(body);
    if (error) {
      return res.redirect(`accountupdates-user?error=Passwords do not match`);
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    body.email = req.session.user_id;
    try{
      const update = await saveNewPassword(body)
      return res.redirect("accountupdates-user?status=Success");
    }catch(e){
     
      return res.redirect("accountupdates-user?status=Error");
    }
      
    
  },
};
