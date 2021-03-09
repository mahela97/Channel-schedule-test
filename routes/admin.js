const router = require("express").Router();
const {
  loginPageAdmin,
  loginAdmin,

  adminHomepage,
  addChannelPage,

  adminAddChannel,
  addStaffPage,
  addStaff,
} = require("../controllers/adminController");

const { isAdminLogged } = require("../middleware/isAdminLogged");
const { isAdminNotLogged } = require("../middleware/isAdminNotLogged");

//ADMIN LOGIN PAGE
router.get("/", isAdminNotLogged, loginPageAdmin);
router.post("/", loginAdmin);

//router.post("/addAdmin", addAdmin);

//ADMIN HOMEPAGE
router.get("/home", isAdminLogged, adminHomepage);

//ADMIN ADD CHANNEL PAGE
router.get("/addchannel", isAdminLogged, addChannelPage);
router.post("/addchannel", adminAddChannel);

//ADMIN ADD STAFF
router.get("/addstaff", isAdminLogged, addStaffPage);
router.post("/addStaff", addStaff);

module.exports = router;
