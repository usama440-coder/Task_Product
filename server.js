const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static("public"));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
