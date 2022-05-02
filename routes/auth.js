const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const saltRounds = 10;

  let hash = await bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    return hash;
  });

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  try {
    const savedUser = await newUser.save();
    const { password, ...other } = savedUser._doc;
    res.status(201).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.session);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      let authenticated = await bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          return result;
        });

      if (authenticated) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(401).json("Wrong credentials!");
      }
    } else {
      res.status(401).json("Wrong credentials!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
