const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // stack: err.stack,
  });
};

module.exports = errorHandler;
