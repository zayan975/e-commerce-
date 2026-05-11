const express = require("express");
const AdminController = require("../controllers/AdminController");


const router = express.Router();

// POST /api/admin/login
router.post("/login",AdminController.adminLogin);



module.exports = router;