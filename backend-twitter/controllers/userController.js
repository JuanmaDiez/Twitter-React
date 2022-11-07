const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;
const formidable = require("formidable");
const _ = require("lodash");

function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newUser = new User({
      firstname: fields.firstName,
      lastname: fields.lastName,
      email: fields.email,
      username: fields.userName,
      avatar: files.image.newFilename,
      password: fields.password,
    });
    await newUser.save();
  });
  return res.json(newUser);
}

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Credenciales invalidas");
  }
  const checkPassword = await user.comparePassword(req.body.password);
  if (!checkPassword) {
    return res.json("Credenciales invalidas");
  }
  const payload = { user: user };
  const token = jwt.sign(payload, JWT_STRING_SECRETO); // El string sescreto deberia estar en archivo .env
  return res.json({ token, user });
}

async function update(req, res) {
  const user = await User.findById(req.params.id).populate("followers");
  if (
    _.findIndex(user.followers, { username: req.auth.user.username }) === -1
  ) {
    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.auth.user._id },
    });
    await User.findByIdAndUpdate(req.auth.user._id, {
      $push: { following: req.params.id },
    });
  } else {
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.auth.user._id },
    });
    await User.findByIdAndUpdate(req.auth.user._id, {
      $pull: { following: req.params.id },
    });
  }
  return res.json("usuario seguido");
}

async function followers(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate([{ path: "following" }, { path: "followers" }]);

  return res.json(profileUser);
}

async function following(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate([{ path: "followers" }, { path: "following" }]);
  return res.json(profileUser);
}

async function index(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate({
    path: "tweets",
    populate: [{ path: "likes" }, { path: "author" }],
  });
  return res.json(profileUser);
}

module.exports = {
  store,
  followers,
  following,
  index,
  update,
  token,
};
