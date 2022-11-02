require("dotenv").config();

const express = require("express"); // Aqui le decimos a la pagina que utilizaremos Express
const { dbInitialSetup } = require("./db");
const app = express(); // Aqui guardamos dentro de la constante app las funciones de Express
const routes = require("./routes"); // Requiriendo todas las rutas que se encuentran en el index.js de Routes.
const port = process.env.APP_PORT;

app.use(express.static("public")); // Estamos diciendo que las imagenes y los estilos los sacaremos de la carpeta Public
app.use(express.urlencoded({ extended: true })); // Deja disponible req.body para usar en nuestras vistas

routes(app);

// dbInitialSetup(); // Esta linea de codigo prende y apaga los seeders. Aqui llamamos a la funcion dbInitialSetup que esta declarada en el archivo db.js

app.listen(port, function () {
  console.log("Servidor corriendo en el puerto 8000");
  console.log("http://localhost:8000");
});
