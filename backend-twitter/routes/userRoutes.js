const express = require("express");
const { expressjwt: checkJwt } = require("express-jwt");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/login", userController.token);
userRouter.post("/", userController.store);
userRouter.use(checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }))
userRouter.get( "/:username",userController.index);
userRouter.get( "/:username/followers",userController.followers);
userRouter.get("/:username/following", userController.following);
userRouter.patch("/:id",userController.update);

module.exports = userRouter;
