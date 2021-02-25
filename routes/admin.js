const router = require("express").Router();
const {
  loginPageAdmin,
  loginAdmin,
  addAdmin,
  adminHomepage,
  addChannelPage,
  channelListPage,
  accountUpdatePage,
  adminAddChannel,
  addStaffPage,
  addStaff,
} = require("../controllers/adminController");

const { isAdminLogged } = require("../middleware/isAdminLogged");
const { isAdminNotLogged } = require("../middleware/isAdminNotLogged");

//ADMIN LOGIN PAGE
router.get("/", isAdminNotLogged, loginPageAdmin);
router.post("/", loginAdmin);

router.post("/addAdmin", addAdmin);

//ADMIN HOMEPAGE
router.get("/home", isAdminLogged, adminHomepage);

//ADMIN ADD CHANNEL PAGE
router.get("/addchannel", isAdminLogged, addChannelPage);
router.post("/addchannel", adminAddChannel);

//ADMIN CHANNEL LIST PAGE
router.get("/channellist", isAdminLogged, channelListPage);

//ADMIN ACCOUNT UPDATE
router.get("/accountupdates", isAdminLogged, accountUpdatePage);

//ADMIN ADD STAFF
router.get("/addstaff", isAdminLogged, addStaffPage);
router.post("/addStaff", addStaff);

module.exports = router;
