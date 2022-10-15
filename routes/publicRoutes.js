const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController");
const passport = require("passport");

publicRouter.get("/login", publicController.login);
publicRouter.post(
  "/login",
  passport.authenticate("local", {
    succesRedirect: "/",
    failureRedirect: "/login",
  })
);
publicRouter.get("/register", publicController.register);

module.exports = publicRouter;
