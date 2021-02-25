const isStaff = (req, res, next) => {
  if (req.session.type === "staff") {
    next();
  } else {
    res.redirect(`${req.session.type}/home`);
  }
};

module.exports = isStaff;
