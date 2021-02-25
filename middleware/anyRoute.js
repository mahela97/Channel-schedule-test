module.exports = {
  anyPage: (req, res) => {
    if (req.session.type === "admin") {
      return res.redirect(`/admin/home`);
    } else if (req.session.type === "user") {
      return res.redirect(`/user/home`);
    } else if (req.session.type === "staff") {
      return res.redirect(`/staff/home`);
    } else {
      return res.redirect(`/login`);
    }
  },
};
