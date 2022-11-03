const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img",
  keepExtensions: true,
});

function store(req, res) {
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

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json("Credenciales invalidas");
  }
  const checkPassword = await user.comparePassword(req.body.password);
  if (!checkPassword) {
    return res.json("Credenciales invalidas");
  }
  const payload = { email: req.body.email };
  const token = jwt.sign(payload, JWT_STRING_SECRETO); // El string sescreto deberia estar en archivo .env
  return res.json({ token });
}

async function update(req, res) {
  const user = User.findById(req.params.id);
  if (_.findIndex(user.followers, { _id: req.user._id }) === -1) {
    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.params.userId },
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { following: req.params.id },
    });
  } else {
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.params.userId },
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $pull: { following: req.params.id },
    });
  }
  return res.json("usuario seguido");
}

async function followers(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("followers");
  return res.json(profileUser);
}

async function following(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("following");
  return res.json(profileUser);
}

async function index(req, res) {
  const profileUser = await User.findOne({
    username: req.params.username,
  }).populate("tweets");
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
