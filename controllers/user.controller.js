const { createUser, getUsers, getUser } = require("../services/user.service");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

// @desc    Register a user
// @route   POST /api/v1/user/register
const registerUser = async (req, res, next) => {
  try {
    // check required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError("Required fields not provided", 400);
    }

    const isExists = await getUser(email);
    if (isExists.length !== 0) {
      throw new AppError("User already exists", 400);
    }

    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // insert into DB
    const result = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    if (result.affectedRows !== 1) {
      throw new AppError("Record could not inserted", 400);
    }
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/v1/user
const getAllUsers = async (req, res, next) => {
  try {
    const result = await getUsers();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

// @desc    Get user by email
// @route   GET /api/v1/user/login
const loginUser = async (req, res, next) => {
  try {
    // check required fields
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Required fields not provided", 400);
    }

    // find record
    const result = await getUser(email);
    if (result.length === 0) {
      throw new AppError("Record not found", 404);
    }
    const user = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      joining: result[0].joining,
    };

    // check valid password
    if (await bcrypt.compare(password, result[0].password)) {
      // generate token
      const token = jwt.sign(
        { id: result[0].id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ success: true, user, token });
    } else {
      throw new AppError("Invalid password");
    }
  } catch (error) {
    res.statusCode = 400;
    next(error);
  }
};

module.exports = { registerUser, getAllUsers, loginUser };
