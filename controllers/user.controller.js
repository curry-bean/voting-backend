import userModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt.util.js";
import validator from "email-validator";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, admin, phone } = req.body;

  const ifUserExist = await userModel.findOne({ email });

  if (ifUserExist) {
    res.status(400).json({
      errorMessage: "email is already in use please check and try again",
    });
  }

  if (validator.validate(req.body.email)) {
    const user = await userModel.create({
      username,
      email,
      password,
      phone,
      admin,
    });

    const token = generateToken(user._id);

    if (user) {
      res.json({
        username: user.username,
        email: user.email,
        admin: user.admin,
        phone: user.phone,
        profilePic: user.profilePic,
        token: token,
      });
    } else {
      res.status(500).json({
        message:
          "an error occurred while processing your request, please try again ",
      });
    }
  } else {
    res.status(500).json({
      errorMessage: "Invalid Email Type",
    });
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const token = generateToken(user._id);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      admin: user.admin,
      phone: user.phone,
      token: token,
    });
  } else {
    res.status(400).json({
      errorMessage: "wrong password!",
    });
  }

  next();

  if (!user) {
    res.status(400).json({
      errorMessage: "email not found!",
    });
  }
});

// if (user && (await user.matchPassword(password))) {
//   res.json({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     profilePic: user.profilePic,
//     admin: user.admin,
//     token: token,
//   });
// } else {
//   res.status(400).json({
//     errorMessage: "invalid email or password please check and try again!",
//   });
// }

export const passwordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.json({ message: "A reset password link has been sent to your email" });
    await SendGridHelper.sendPasswordResetEmail(email);
  } else {
    res.status(400);
  }
});
