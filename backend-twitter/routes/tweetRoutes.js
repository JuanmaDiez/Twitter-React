const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;

tweetRouter.use(
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] })
);
tweetRouter.get("/", tweetController.index);
tweetRouter.post("/", tweetController.store);
tweetRouter.delete("/profile/:tweetId", tweetController.destroy);
tweetRouter.patch("/:tweetId", tweetController.update);

module.exports = tweetRouter;
