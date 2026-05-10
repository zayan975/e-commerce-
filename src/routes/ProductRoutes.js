const express = require('express');
const ProductController = require('../controllers/ProductController');
const upload = require('../middleware/Multer');


const router = express.Router();

router.post("/add", upload.fields([{ name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 },{ name: "image4", maxCount: 1 }]), ProductController.addProduct);
router.get("/list", ProductController.listProducts);
router.delete("/remove/:id", ProductController.removeProduct);
router.get("/single/:id", ProductController.singleProduct);

module.exports = router;