const Tweet = require("../models/Tweet");
const User = require("../models/User");
const _ = require("lodash");

async function index(req, res) {
  const loggedUser = await User.findById(req.auth.id);
  const followingTweets = await Tweet.find({
    author: { $in: loggedUser.following },
  })
    .populate([{ path: "author" }, { path: "likes" }])
    .sort({ createdAt: "desc" })
    .limit(20);
  return res.status(201).json(followingTweets);
}

async function update(req, res) {
  const tweet = await Tweet.findById(req.params.tweetId);
  if (
    _.findIndex(tweet.likes, (user) => {
      return user.toString() === req.auth.id;
    }) === -1
  ) {
    await Tweet.findByIdAndUpdate(req.params.tweetId, {
      $push: { likes: req.auth.id },
    });
  } else {
    await Tweet.findByIdAndUpdate(req.params.tweetId, {
      $pull: { likes: req.auth.id },
    });
  }
  return res.json(tweet);
}

async function store(req, res) {
  const newTweet = new Tweet({
    author: req.auth.id,
    content: req.body.content,
  });
  await newTweet.save();
  await User.findByIdAndUpdate(req.auth.id, {
    $push: { tweets: newTweet._id },
  });
  return res.json(newTweet);
}

async function destroy(req, res) {
  await Tweet.findByIdAndRemove(req.params.tweetId);
  return res.json("El tweet ha sido eliminado");
}

module.exports = {
  index,
  store,
  destroy,
  update,
};
