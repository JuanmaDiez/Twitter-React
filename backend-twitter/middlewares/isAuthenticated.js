function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.query.redirectTo;
    return res.redirect("/login");
  }
}

module.exports = isAuthenticated;
