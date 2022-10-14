const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/db-twitter");
mongoose.connection
  .once("open", () => console.log("Conexion con la base de datos establecida"))
  .on("error", () => console.log(error));

//   async function dbInitialSetup(){
//     await require("./seeders/")
//   }

module.exports = mongoose;
