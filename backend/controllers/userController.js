import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// 🔑 GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "SECRET_KEY", {
    expiresIn: "30d",
  });
};

// ✅ LOGIN USER
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login Attempt:", email, password);

  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found");
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.matchPassword(password);
  console.log("Password Match:", isMatch);

  if (isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ✅ REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password, // 🔥 WILL AUTO HASH
    role,
  });

  res.status(201).json(user);
});