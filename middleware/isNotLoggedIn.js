module.exports = {
  isNotLoggedIn: (req, res, next) => {
    if (req.session.type === "admin" && req.session.type) {
      req.session.user_id = null;
      req.session.type = null;
    }
    if (!req.session.user_id) {
      next();
    } else {
      res.redirect("/");
    }
  },
};
