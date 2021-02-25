const { error } = require("console");
const url = require("url");
const db = require("../config/database");
const {
  getchannel,
  gettimeslot,
  getday,
  scheduleChannel,
  getTimeTable,
  getprogramTable,
  addfeedback,
  getuserId,
  addProgram,
} = require("../models/userModel");
const {
  findChannelbyId,
  findprogrambyChannelId,
} = require("../models/staffModel");

exports.get_channel = async (req, res) => {
  if (req.url != "/timetable") {
    const channels = await getchannel();
    const timetable = await getTimeTable(req.params.id);
    res.locals.channel = { channel: channels, timetable: timetable };
    res.locals.ch = req.params.id;
  } else {
    const channels = await getchannel();
    const timetable = "";
    res.locals.channel = { channel: channels, timetable: timetable };
  }
  res.render("user/timetable");
};

exports.getschedulel = async (req, res) => {
  if (req.session.type === "staff") {
    const timeSlot = await gettimeslot();
    const day = await getday();

    const userId = await getuserId(req.session.user_id);

    const ch_name = await findChannelbyId(userId);
    const timetable = await getTimeTable(ch_name.channel_name);

    const programs = await findprogrambyChannelId(ch_name.channel_id);
    res.locals.channel = {
      timeslot: timeSlot,
      day: day,
      timetable: timetable,
      programs: programs,
    };

    res.render("staff/schedule");
  } else {
    res.redirect(`/login`);
  }
};
exports.schedulel = async (req, res) => {
  if (req.session.type === "staff") {
    const userId = await getuserId(req.session.user_id);
    const channel_id = await findChannelbyId(userId);
    await scheduleChannel(req.body, channel_id.channel_id);
    res.redirect("schedule");
  } else {
    res.redirect(`/login`);
  }
};
exports.get_program = async (req, res) => {
  if (req.session.type === "user") {
    if (req.url != "/addfeedback") {
      const channels = await getchannel();
      const userId = await getuserId(req.session.user_id);
      const programTable = await getprogramTable(req.params.id, userId);
      res.locals.channel = { channel: channels, programTable: programTable };
      console.log(programTable);
      res.locals.ch = req.params.id;
    } else {
      const channels = await getchannel();
      const programTable = "";
      res.locals.channel = { channel: channels, programTable: programTable };
    }
    res.render("user/addfeedback");
  } else {
    res.redirect(`/login`);
  }
};

exports.addfeedback = async (req, res) => {
  if (req.session.type === "user") {
    const userId = await getuserId(req.session.user_id);
    await addfeedback(req.body, userId);
    res.redirect("/user/" + req.url);
  } else {
    res.redirect(`/login`);
  }
};
exports.AddProgram = async (req, res) => {
  if (req.session.type === "staff") {
    const queryObject = url.parse(req.url, true).query;
    const userId = await getuserId(req.session.user_id);
    const channel_id = await findChannelbyId(userId);
    await addProgram(queryObject.programme, channel_id.channel_id);
    res.redirect("schedule");
  } else {
    res.redirect(`login`);
  }
};
