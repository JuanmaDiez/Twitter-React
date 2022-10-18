const formidable = require("formidable");
const User = require("../models/User");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img",
  keepExtensions: true,
});

function login(req, res) {
  return res.render("login");
}

function register(req, res) {
  return res.render("register");
}

function create(req, res) {
  form.parse(req, async (err, fields, files) => {
    const newUser = await new User({
      firstname: fields.firstName,
      lastname: fields.lastName,
      email: fields.email,
      username: fields.userName,
      avatar: files.image.newFilename,
      password: fields.password,
    });
    await newUser.save();
  });
  return res.redirect("/login");
}

async function logOut(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = { login, register, create, logOut };
