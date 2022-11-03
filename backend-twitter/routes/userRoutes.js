const express = require("express");
const { expressjwt: checkJwt } = require("express-jwt");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/login", userController.token);
userRouter.post("/register", userController.store);
userRouter.get(
  "/profile/:username",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  userController.index
);
userRouter.get(
  "/profile/:username/followers",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  userController.followers
);
userRouter.get(
  "/profile/:username/following",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  userController.following
);
userRouter.patch(
  "/:id/follow",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  userController.update
);

module.exports = userRouter;
