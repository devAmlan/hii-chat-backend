import User from "../model/userModel.js";
import _ from "lodash";
import generateToken from "../config/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  if (_.some([name, email, password], (item) => _.isEmpty(item))) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (_.some([email, password], (item) => _.isEmpty(item))) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const user = await User.findOne({ email });

  if (user && _.isEqual(user.password, password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};
