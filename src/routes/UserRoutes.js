const express = require("express");
const controller = require("../controllers/UserController");

const router = express.Router();

// route POST/api/user/register
router.post("/register",controller.UserRegistered);


module.exports = router;