const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const validator = require("validator");

// User Registration
// POST /api/user/register
const UserRegistered = async (req, res) => {
 try {
   const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!validator.isLength(password, { min: 4 })) {
    return res.status(400).json({ message: "Password must be at least 4 characters long" });
  }

  const isUserExist = await userModel.findOne({
    email: email,
  });

  if (isUserExist) {
    return res
      .status(400)
      .json({ message: "User name and email already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const User = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  await User.save();

  const token = jwt.sign(
    {
      id: User._id,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token)

  res.status(201).json({
    message: "User Register Sucessfully",
    user: {
      id: User._id,
      name: User.name,
      email: User.email,
    },
    token,
  });
 } catch (err) {
    console.error(err, "Error in User Registration");
 }
};


// User Login
// POST /api/user/login
const UserLogin = async (req,res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
    const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token)

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};


// User Logout
// POST /api/user/logout

const UserLogout = async (req,res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });

}



module.exports = {
  UserRegistered,
  UserLogin,
  UserLogout,
};
