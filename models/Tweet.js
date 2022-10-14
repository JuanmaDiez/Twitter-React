const { mongoose } = require("../db");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: String,
    author: ObjectId,
    likes: [ObjectId],
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
