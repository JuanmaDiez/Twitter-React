const publicRouter = require("./publicRoutes");
const privateRouter = require("./privateRoutes");

module.exports = (app) => {
  app.use(publicRouter);
  app.use(privateRouter);
};
