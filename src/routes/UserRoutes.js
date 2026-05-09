const express = require("express");
const controller = require("../controllers/UserController");

const router = express.Router();

// route POST/api/user/register
router.post("/register",controller.UserRegistered);
// route POST/api/user/login
router.post("/login",controller.UserLogin);
// route POST/api/user/logout
router.post("/logout",controller.UserLogout);


module.exports = router;