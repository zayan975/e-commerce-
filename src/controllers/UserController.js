const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// User Registration
// POST /api/user/register
const UserRegistered = async (req, res) => {
  const { name, email, password, role } = req.body;

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
    role,
  });

  await User.save();

  const token = jwt.sign(
    {
     id: User._id,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: "1h" },
  );

  res.status(201).json({
    message: "User Register Sucessfully",
    user: {
      id: User._id,
      name: User.name,
      email: User.email,
      role: User.role,
    },
    token,
  });
};

module.exports = {
    UserRegistered
}
