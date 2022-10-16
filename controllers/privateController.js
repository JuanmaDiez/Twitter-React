const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = await Tweet.find().populate("author");
  return res.render("home", { tweets });
}

async function indexUser(req, res) {
  const user = await User.findById(req.params.id).populate("tweets");
  return res.render("profile", { user });
}

module.exports = {
  index,
  indexUser,
};
