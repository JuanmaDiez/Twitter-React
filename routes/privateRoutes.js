const express = require("express");
const privateRouter = express.Router();
const privateController = require("../controllers/privateController");

privateRouter.get("/", privateController.index);
privateRouter.post("/", privateController.create);
privateRouter.get("/profile/:username", privateController.indexUser);
privateRouter.delete("/profile/:tweetId/delete", privateController.deleteTweet);
privateRouter.patch("/:tweetId/update", privateController.updateTweet);

module.exports = privateRouter;
