const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  const loggedUser = await User.findById(req.user._id);
  const followingTweets = await Tweet.find({
    user: { $in: loggedUser.following },
  })
    .populate("author")
    .sort({ createdAt: "desc" })
    .limit(20);
  return res.json(followingTweets);
}

async function updateLike(req, res) {
  const tweet = await Tweet.findById(req.params.tweetId);
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $push: { likes: req.user._id },
  });
  return res.json(tweet);
}

async function removeLike(req, res) {
  const tweet = await Tweet.findById(req.params.tweetId);
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $pull: { likes: req.user._id },
  });
  return res.json(tweet);
}

async function store(req, res) {
  const newTweet = new Tweet({
    author: req.user._id,
    content: req.body.content,
  });
  await newTweet.save();
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
  updateLike,
  removeLike,
};
