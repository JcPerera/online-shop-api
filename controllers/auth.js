import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  let hash = await bcrypt.hash(req.body.password, 10);

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
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      let authenticated = await bcrypt.compare(
        req.body.password,
        user.password
      );

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
};
