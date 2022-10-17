const publicRouter = require("./publicRoutes");
const privateRouter = require("./privateRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews)
  app.use(publicRouter);
  app.use(privateRouter);
};
