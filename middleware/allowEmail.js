const allowEmail = (req, res, next) => {
  if (req.session.type === "admin" && req.session.type) {
    req.session.user_id = null;
    req.session.type = null;
  }
  if (req.session.email) {
    next();
  } else {
    res.redirect(`/login`);
  }
};

module.exports.allowEmail = allowEmail;
