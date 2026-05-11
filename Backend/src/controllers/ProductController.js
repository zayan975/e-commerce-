const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

// Add product
// POST /api/product/add
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    if (imagesUrl.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const productData = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      image: imagesUrl,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: new Date(),
    });
    console.log(productData);

    await productData.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: productData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

// list products
// GET /api/product/list
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching products",
        error: error.message,
      });
  }
};

// remove product
// DELETE /api/product/remove/:id
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error removing product",
        error: error.message,
      });
  }
};

// single product
// GET /api/product/single/:id
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching product",
        error: error.message,
      });
  }
};

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
