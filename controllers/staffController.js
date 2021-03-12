const { validatePassword } = require("./validator/validate");
const { saveNewPassword } = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  //RENDER STAFF HOMEPAGE

  staffHomepage: (req, res) => {
    res.render("staff/home-staff");
  },

  //ACCOUNT UPDATE PAGE
  accountUpdatePage: (req, res) => {
    return res.render(`staff/accountupdates`, { status: req.query.status });
  },

  //CHANGE PASSWORD
  accountUpdate: async (req, res) => {
    const body = req.body;
    const { error } = validatePassword(body);
    if (error) {
      
      return res.redirect(`accountupdate?error=Passwords do not match`);
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
