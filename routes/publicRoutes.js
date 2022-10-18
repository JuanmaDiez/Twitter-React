const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController");
const passport = require("passport");

publicRouter.get("/login", publicController.login);
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
publicRouter.get("/register", publicController.register);
publicRouter.post("/register", publicController.create);
publicRouter.get("/logout", publicController.logOut);

module.exports = publicRouter;
