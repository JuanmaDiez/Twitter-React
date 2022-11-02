const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const isAuthenticated = require("../middlewares/isAuthenticated");

tweetRouter.get("/", tweetController.index);
tweetRouter.post("/", tweetController.create);

tweetRouter.delete("/profile/:tweetId/delete", tweetController.deleteTweet);
tweetRouter.patch("/:tweetId/like/:userId", tweetController.updateLike);
tweetRouter.patch("/:tweetId/removeLike/:userId", tweetController.removeLike);

module.exports = tweetRouter;
