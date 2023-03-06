const jwt = require("jsonwebtoken");
const { getUserId } = require("../services/user.service");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let result = {};
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    result = await getUserId(decoded.id);
    req.user = result[0];
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
