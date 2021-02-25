const router = require("express").Router();

const {
  userHomePage,
  accountUpdatePage,
  accountUpdate,
} = require("../controllers/userController");

const { isLogged } = require("../middleware/isLogged");
const channel = require("../controllers/channel");

//Homepage
router.get("/home", isLogged, userHomePage);
router.get("/user", isLogged, userHomePage);

router.get("/timetable", isLogged, channel.get_channel);
router.get("/accountupdates-user", isLogged, accountUpdatePage);
router.post("/accountupdates-user", accountUpdate);

router.get("/addfeedback", isLogged, channel.get_program);
router.get("/timetable/:id", isLogged, channel.get_channel);
router.get("/addfeedback/:id", isLogged, channel.get_program);
router.post("/addfeedback/:id", channel.addfeedback);
module.exports = router;
