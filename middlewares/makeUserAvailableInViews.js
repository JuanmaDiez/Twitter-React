function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  return next();
}
// Este middleware se crea para poder utilizar req.user en nuestros archivos de vistas.

module.exports = makeUserAvailableInViews;
