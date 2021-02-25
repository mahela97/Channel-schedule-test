module.exports = {
  isAdminNotLogged: (req, res, next) => {
    if (!req.session.user_id || req.session.user_id != "admin") {
      next();
    } else {
      res.redirect("admin/home");
    }
  },
};
