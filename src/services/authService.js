const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (data) => {
  const { userName, lastName, phone, email, pin, password, birthDate } = data;

  if (!userName || !lastName || !phone || !email || !pin || !password || !birthDate) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const user = new User({
    userName,
    lastName,
    phone,
    email,
    pin,
    password,
    birthDate,
  });

  await user.save();

  return user;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};