const express = require("express");
const publicRouter = express.Router();
const publicController = require("../controllers/publicController");

publicRouter.get("/login", publicController.login);

publicRouter.get("/register", publicController.register);

module.exports = publicRouter;
