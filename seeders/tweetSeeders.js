const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const _ = require("lodash");

module.exports = async () => {
  await mongoose.connection.dropCollection("tweets");
  const tweets = [];
  for (let i = 0; i < 20; i++) {
    const newTweet = new Tweet({
      content: faker.lorem.paragraph(),
      author: {},
      likes: [],
    });
    tweets.push(newTweet);
  }

  const users = await User.find();

  for (const tweet of tweets) {
    const randomUser = _.sample(users);
    tweet.author = randomUser;
  }
  await Tweet.insertMany(tweets);
};
