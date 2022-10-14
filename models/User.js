const { mongoose } = require("../db");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    avatar: String,
    password: String,
    bio: String,
    tweets: [],
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
