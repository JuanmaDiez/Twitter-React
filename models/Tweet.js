const { mongoose } = require("../db");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
