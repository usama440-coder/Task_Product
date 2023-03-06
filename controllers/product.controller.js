const AppError = require("../utils/AppError");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../services/product.service");

// @desc    Add a product
// @route   POST /api/v1/product
const addProduct = async (req, res, next) => {
  try {
    // check required fields
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename,
      name_ar: req.body.name_ar,
      description_ar: req.body.description_ar,
    };

    // console.log(data);
    if (
      !data.name ||
      !data.description ||
      !data.price ||
      !data.image ||
      !data.name_ar ||
      !data.description_ar
    ) {
      throw new AppError("Required Fields not provided", 400);
    }

    // data entered success
    const result = await createProduct(data);
    if (result.affectedRows !== 1) {
      throw new AppError("Error inserting record");
    }

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Get all products
// @route   GET /api/v1/product
const getAllProducts = async (req, res, next) => {
  try {
    const { lang } = req.query;
    const result = await getProducts(lang);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Get product by id
// @route   GET /api/v1/product/:id
const getSingleProduct = async (req, res, next) => {
  try {
    const { lang } = req.query;
    let result = await getProduct(req.params.id, lang);
    if (result.length === 0) {
      throw new AppError("No product found", 404);
    }
    const data = result[0];

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Delete a product by id
// @route   DELETE /api/v1/product/:id
const deleteSingleProduct = async (req, res, next) => {
  try {
    // product exist
    const productExists = await getProduct(req.params.id);
    if (!productExists || productExists.length === 0) {
      throw new AppError("Product not found", 404);
    }

    // delete
    const result = await deleteProduct(req.params.id);
    if (result.affectedRows === 1) {
      res
        .status(200)
        .json({ success: true, message: "Produdct deleted successfully" });
    } else {
      throw new AppError("Error in deleting product", 400);
    }
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Update a product by id
// @route   UPDATE /api/v1/product/:id
const updateSingleProduct = async (req, res, next) => {
  try {
    const name = req.body?.name;
    const description = req?.body?.description;
    const price = req.body?.price;
    const image = req.file?.filename;
    const name_ar = req.body?.name_ar;
    const description_ar = req.body?.description_ar;

    // product exist
    const productExists = await getProduct(req.params.id);
    if (!productExists || productExists.length === 0) {
      throw new AppError("Product not found", 404);
    }
    product = productExists[0];

    // update
    if (name) {
      product.name = name;
    }
    if (name_ar) {
      product.name_ar = name_ar;
    }
    if (description_ar) {
      product.description_ar = description_ar;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (image) {
      product.image = image;
    }

    const result = await updateProduct(req.params.id, product);
    if (result.affectedRows === 1) {
      res
        .status(200)
        .json({ success: true, message: "Produdct updated successfully" });
    } else {
      throw new AppError("Error in updating product", 400);
    }
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
