const { User } = require("../db/models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, jWT_EXPIRATION_MS } = require("../config/keys");

exports.findUser = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.signup = async (req, res) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const HashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = HashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + jWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ messege: error.messege });
  }
};

exports.signin = async (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + jWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
