const express = require("express");
const privateRouter = express.Router();
const privateController = require("../controllers/privateController");

privateRouter.get("/", privateController.index);
privateRouter.get("/profile/:id", privateController.indexUser);

module.exports = privateRouter;
