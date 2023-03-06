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

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   },
// }).single("productImage");

// const checkFileType = (file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images only!");
//   }
// };

productRouter.post("/", upload.single("image"), addProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.delete("/:id", deleteSingleProduct);
productRouter.put("/:id", upload.single("image"), updateSingleProduct);

module.exports = productRouter;
