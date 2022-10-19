const publicRouter = require("./publicRoutes"); // Traemos todos los archivos de rutas publicas
const privateRouter = require("./privateRoutes"); // Traemos todos los archivos de rutas privadas.
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews"); // Requerimos el middleware para poder utilizarlo en este Archivo.

module.exports = (app) => {
  app.use(makeUserAvailableInViews); // Aqui estamos blindando las rutas Publicas y Privadas con el middleware.
  app.use(publicRouter);
  app.use(privateRouter);
};
