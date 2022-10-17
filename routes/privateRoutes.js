const express = require("express");
const privateRouter = express.Router();
const privateController = require("../controllers/privateController");
const isAuthenticated = require("../middlewares/isAuthenticated");

privateRouter.use(isAuthenticated);

privateRouter.get("/", privateController.index);
privateRouter.post("/", privateController.create);
privateRouter.get("/profile/:username", privateController.indexUser);
privateRouter.delete("/profile/:tweetId/delete", privateController.deleteTweet);
privateRouter.patch("/:tweetId/like", privateController.updateLike);
privateRouter.patch("/:tweetId/removeLike", privateController.removeLike);
privateRouter.patch("/:id/follow", privateController.follow);
privateRouter.patch("/:id/unfollow", privateController.unfollow);

module.exports = privateRouter;
