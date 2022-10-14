function index(req, res) {
  return res.render("home");
}

function indexUser(req, res) {
  return res.render("profile");
}

module.exports = {
  index,
  indexUser,
};
