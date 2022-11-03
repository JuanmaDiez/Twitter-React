const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  
  const loggedUser = await User.findById(req.auth.id);
  const followingTweets = await Tweet.find({
    user: { $in: loggedUser.following },
  })
    .populate("author")
    .sort({ createdAt: "desc" })
    .limit(20);
  return res.json(followingTweets);
  return res.status(201);
}

async function update(req, res) {
  const tweet = await Tweet.findById(req.params.tweetId);
  if (_.findIndex(tweet.likes, { _id: req.auth.id }) === -1) {
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
