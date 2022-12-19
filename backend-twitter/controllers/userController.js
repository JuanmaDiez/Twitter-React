const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;
const formidable = require("formidable");
const _ = require("lodash");

async function index(req, res) {
  const users = await User.find().limit(10);
  return res.json(users);
}

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
      following: [],
      followers: [],
      avatar: files.image.newFilename,
      password: fields.password,
    });
    await newUser.save();
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, JWT_STRING_SECRETO);
    return res.json({
      token,
      _id: newUser._id,
      firstname: newUser.firstname,
      username: newUser.username,
      avatar: newUser.avatar,
      following: newUser.following,
    });
  });
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
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_STRING_SECRETO);
  return res.json({
    token,
    _id: user._id,
    username: user.username,
    firstname: user.firstname,
    avatar: user.avatar,
    following: user.following,
  });
}

async function update(req, res) {
  const user = await User.findById(req.params.id);
  if (
    _.findIndex(user.followers, (follower) => {
      return follower.toString() === req.auth.id;
    }) === -1
  ) {
    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.auth.id },
    });
    await User.findByIdAndUpdate(req.auth.id, {
      $push: { following: req.params.id },
    });
  } else {
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.auth.id },
    });
    await User.findByIdAndUpdate(req.auth.id, {
      $pull: { following: req.params.id },
    });
  }
  return res.json("usuario seguido");
}

async function followers(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate([{ path: "following" }, { path: "followers" }]);
  delete profileUser.password;
  return res.json(profileUser);
}

async function following(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate([{ path: "followers" }, { path: "following" }]);
  delete profileUser.password;
  return res.json(profileUser);
}

async function show(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate({
    path: "tweets",
    populate: [{ path: "likes" }, { path: "author" }],
  });
  delete profileUser.password;
  return res.json(profileUser);
}

module.exports = {
  store,
  followers,
  following,
  show,
  update,
  token,
  index,
};
