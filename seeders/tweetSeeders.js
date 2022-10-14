const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const _ = require("lodash");

module.exports = async () => {
  const tweets = [];
  for (let i = 0; i < 20; i++) {
    const newTweet = new Tweet({
      content: faker.lorem.paragraph(),
      author: "",
      likes: [],
    });
    tweets.push(newTweet);
  }

  const users = await User.find();

  for (const tweet of tweets) {
    const randomUser = _.sampleSize(users, 1);
    tweet.author = randomUser;
  }
  await Tweet.insertMany(tweets);
};
