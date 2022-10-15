const User = require("../models/User");

function index(req, res) {
  return res.render("home");
}

async function indexUser(req, res) {
  const user = await User.findById(req.params.id).populate("tweets");
  return res.render("profile", { user });
}

module.exports = {
  index,
  indexUser,
};
