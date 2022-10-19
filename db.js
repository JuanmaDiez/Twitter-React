const mongoose = require("mongoose");
const DATABASE_NAME = process.env.DATABASE_NAME; // Para traer informacion del archivo .env se utiliza primer process.env."la constante del archivo que querramos traer"

mongoose.connect(`mongodb://127.0.0.1:27017/${DATABASE_NAME}`); // ${} se utiliza para poder escribir JavaScript dentro de la URL.
mongoose.connection
  .once("open", () => console.log("Conexion con la base de datos establecida"))
  .on("error", () => console.log("Ha habido un error")); // De la linea 5 a la 7 no son obligatorias. Simplemente prueban la conexion con mongoose.

async function dbInitialSetup() {
  await require("./seeders/userSeeders")(); // Aqui declaramos la funcion dbInitialSetup y requerimos los seeders correspondientes.

  await require("./seeders/tweetSeeders")(); // La funcion luego es llamada en el Archivo server.js
}

module.exports = { mongoose, dbInitialSetup }; // Exportamos para poder utilizar mongoose y la funcion dbInitialSetup en otros Archivos del proyecto.
