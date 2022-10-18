require("dotenv").config();

const express = require("express"); // Aqui le decimos a la pagina que utilizaremos Express
const { dbInitialSetup } = require("./db");
const app = express(); // Aqui guardamos dentro de la constante app las funciones de Express
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./config/passport");
const methodOverride = require("method-override");
const PASSPORT_STRING_SECRETO = process.env.PASSPORT_STRING_SECRETO;
const port = process.env.APP_PORT;

app.set("view engine", "ejs"); // Aqui mostramos que el motor de vistas sera EJS
app.use(methodOverride("_method")); // Le decimos al servidor que vamos a sobrescribir metodos en los formularios
app.use(express.static("public")); // Estamos diciendo que las imagenes y los estilos los sacaremos de la carpeta Public
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: PASSPORT_STRING_SECRETO,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

passportConfig(passport);
routes(app);

dbInitialSetup();

app.listen(port, function () {
  console.log("Servidor corriendo en el puerto 3000");
  console.log("http://localhost:3000");
});
