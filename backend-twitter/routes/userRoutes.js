const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
userRouter.get("/profile/:username", userController.index);
userRouter.get("/profile/:username/followers", userController.followers);
userRouter.get("/profile/:username/following", userController.following);
userRouter.patch("/:id/follow/:userId", userController.follow);
userRouter.patch("/:id/unfollow/:userId", userController.unfollow);
userRouter.post("/register", userController.store);

module.exports = userRouter;
