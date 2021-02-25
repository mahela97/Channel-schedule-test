module.exports = {
  isAdminLogged: (req, res, next) => {
    if (req.session.type === "admin") {
      next();
    } else {
      res.redirect("/admin");
    }
  },
};
