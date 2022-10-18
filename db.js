const mongoose = require("mongoose");
const DATABASE_NAME = process.env.DATABASE_NAME;

mongoose.connect(`mongodb://127.0.0.1:27017/${DATABASE_NAME}`);
mongoose.connection
  .once("open", () => console.log("Conexion con la base de datos establecida"))
  .on("error", () => console.log("Ha habido un error"));

async function dbInitialSetup() {
  await require("./seeders/userSeeders")();

  await require("./seeders/tweetSeeders")();
}

module.exports = { mongoose, dbInitialSetup };
