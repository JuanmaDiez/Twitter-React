const express = require("express"); // Aqui le decimos a la pagina que utilizaremos Express
const { dbInitialSetup } = require("./db");
const app = express(); // Aqui guardamos dentro de la constante app las funciones de Express
const routes = require("./routes");
app.set("view engine", "ejs"); // Aqui mostramos que el motor de vistas sera EJS
app.use(express.static("public")); // Estamos diciendo que las imagenes y los estilos los sacaremos de la carpeta Public

routes(app);

dbInitialSetup();

app.listen(3000, function () {
  console.log("Servidor corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
