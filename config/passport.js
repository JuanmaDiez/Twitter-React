const LocalStrategy = require("passport-local");
const { User } = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function (
      username,
      password,
      done
    ) {
      let user;

      try {
        user = await User.findOne({ email: username });
      } catch (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: "Credenciales incorrectas" });
      }
      const checkPassword = await user.passwordCheck(password);
      if (!checkPassword) {
        return done(null, false, { message: "Credenciales incorrectas" });
      }
      return done(null, user);
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findByPk(id);

      done(null, user);
    } catch (error) {
      console.log(error);
      done(error);
    }
  });
};
