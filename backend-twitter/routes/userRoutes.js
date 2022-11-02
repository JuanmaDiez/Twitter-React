const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/login", userController.token);
userRouter.get("/profile/:username", userController.index);
userRouter.get("/profile/:username/followers", userController.followers);
userRouter.get("/profile/:username/following", userController.following);
userRouter.patch("/:id/follow", userController.follow);
userRouter.patch("/:id/unfollow", userController.unfollow);
userRouter.post("/register", userController.store);

module.exports = userRouter;
