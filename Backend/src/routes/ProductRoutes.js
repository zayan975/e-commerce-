const express = require('express');
const ProductController = require('../controllers/ProductController');
const upload = require('../middleware/Multer');
const AuthMiddleware = require('../middleware/AdminAuth');


const router = express.Router();

router.post("/add", AuthMiddleware, upload.fields([{ name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 },{ name: "image4", maxCount: 1 }]), ProductController.addProduct);
router.get("/list", AuthMiddleware, ProductController.listProducts);
router.delete("/remove/:id", AuthMiddleware, ProductController.removeProduct);
router.get("/single/:id", AuthMiddleware, ProductController.singleProduct);

module.exports = router;