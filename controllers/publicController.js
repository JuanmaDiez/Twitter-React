function login(req, res) {
  return res.render("login");
}

function register(req, res) {
  return res.render("register");
}

module.exports = { login, register };
