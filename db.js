const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/db-twitter");
mongoose.connection
  .once("open", () => console.log("Conexion con la base de datos establecida"))
  .on("error", () => console.log("Ha habido un error"));

async function dbInitialSetup() {
  await require("./seeders/userSeeders")();

  await require("./seeders/tweetSeeders")();
}

module.exports = { mongoose, dbInitialSetup };
