const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;

tweetRouter.get(
  "/",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  tweetController.index
);
tweetRouter.post(
  "/",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  tweetController.store
);
tweetRouter.delete(
  "/profile/:tweetId",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  tweetController.destroy
);
tweetRouter.patch(
  "/:tweetId",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  tweetController.update
);

module.exports = tweetRouter;
