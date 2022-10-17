const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const tweets = await Tweet.find().populate("author");
  return res.render("home", { tweets });
}

async function create(req, res) {
  const newTweet = new Tweet({
    author: req.user._id,
    content: req.body.content,
  });
  await newTweet.save();
  return res.redirect("/");
}

async function indexUser(req, res) {
  const profileUser = await User.findOne({username: req.params.username}).populate("tweets");
  return res.render("profile", { profileUser });
}

module.exports = {
  index,
  indexUser,
  create,
};
