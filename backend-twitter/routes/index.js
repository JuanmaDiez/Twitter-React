const userRouter = require("./userRoutes"); // Traemos todos los archivos de rutas publicas
const tweetRouter = require("./tweetRoutes"); // Traemos todos los archivos de rutas privadas.

module.exports = (app) => {
  app.use("/users", userRouter);
  app.use("/tweets", tweetRouter);
};
