const isUser = (req, res, next) => {
  if (req.session.type === "user") {
    next();
  } else {
    res.redirect(`${req.session.type}/home`);
  }
};

module.exports.isUser = isUser;
