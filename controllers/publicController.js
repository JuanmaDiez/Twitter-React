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
      image: files.image.newFilename,
      password: fields.password,
    });
    await newUser.save();
  });
  return res.redirect("/login");
}

module.exports = { login, register, create };
