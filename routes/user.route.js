const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  getAllUsers,
  loginUser,
} = require("../controllers/user.controller");

userRouter.post("/register", registerUser);
userRouter.get("/", getAllUsers);
userRouter.post("/login", loginUser);

module.exports = userRouter;
