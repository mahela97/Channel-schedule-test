const isValidate = (req, res, next) => {
  if (req.session.valid) {
    next();
  } else {
    res.redirect(`/login`);
  }
};

module.exports.isValidate = isValidate;
