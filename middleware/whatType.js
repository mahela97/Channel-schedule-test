const whatType = (req, res, next) => {
  if (req.session.type === "admin") {
    req.session.user_id = null;
    req.session.type = null;
  }
  if (req.session.type === "user") {
    res.redirect(`user/home`);
  } else if (req.session.type === "staff") {
    res.redirect(`staff/home`);
  } else {
    res.redirect(`/`);
  }
};

module.exports.whatType = whatType;
