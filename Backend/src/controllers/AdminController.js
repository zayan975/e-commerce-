const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Admin Login
// POST /api/admin/login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== config.ADMIN_EMAIL || password !== config.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // ✅ Properly set cookie so browser stores and sends it back
    res.cookie("token", token);

    res.status(200).json({ message: "Admin login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    adminLogin,
}   