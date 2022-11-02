const { mongoose } = require("../db");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" }, // Aqui guardaremos el id del author, que a su vez corresponde a un usuario.
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // En este Array guardamos los id de los usuarios que le pusieron like a este tweet.
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema); // Nombre del modelo y que Schema va a utilizar se guardan en una constante.

module.exports = Tweet;
