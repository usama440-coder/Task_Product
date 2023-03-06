const express = require("express");
const productRouter = express.Router();
const multer = require("multer");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
} = require("../controllers/product.controller");
const path = require("path");
const { protect } = require("../middleware/auth.middleware");

const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

productRouter.post("/", protect, upload.single("image"), addProduct);
productRouter.get("/", protect, getAllProducts);
productRouter.get("/:id", protect, getSingleProduct);
productRouter.delete("/:id", protect, deleteSingleProduct);
productRouter.put("/:id", protect, upload.single("image"), updateSingleProduct);

module.exports = productRouter;
