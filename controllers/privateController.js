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
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("tweets");
  return res.render("profile", { profileUser });
}

async function deleteTweet(req, res) {
  await Tweet.findByIdAndRemove(req.params.tweetId);
  return res.redirect("back");
}

async function updateLike(req, res) {
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $push: { likes: req.user._id },
  });
  return res.redirect("back");
}

async function removeLike(req, res) {
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $pull: { likes: req.user._id },
  });
  return res.redirect("back");
}

async function followers(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("followers");
  return res.render("followers", { profileUser });
}

async function following(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("following");
  return res.render("following", { profileUser });
}

async function follow(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user._id },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { following: req.params.id },
  });
  return res.redirect("back");
}

async function unfollow(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user._id },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { following: req.params.id },
  });
  return res.redirect("back");
}

module.exports = {
  index,
  indexUser,
  create,
  deleteTweet,
  updateLike,
  removeLike,
  follow,
  unfollow,
  followers,
  following,
};
