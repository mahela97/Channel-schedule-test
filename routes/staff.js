const router = require("express").Router();
const {
  staffHomepage,
  accountUpdatePage,
  accountUpdate,
} = require("../controllers/staffController");
const { isLogged } = require("../middleware/isLogged");
const channel = require("../controllers/channel");

router.get("/home", isLogged, staffHomepage);
router.get("/schedule", isLogged, channel.getschedulel);
router.post("/schedule", channel.schedulel);

router.get("/AddProgram", isLogged, channel.AddProgram);

router.get("/accountupdate", isLogged, accountUpdatePage);
router.post("/accountupdate", accountUpdate);
module.exports = router;
