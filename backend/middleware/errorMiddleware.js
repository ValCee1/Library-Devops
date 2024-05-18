const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "ValidationError") {
    return res.status(400).json({ errors: err.errors });
  }
  res.status(500).json({ message: "Server Error" });
};

module.exports = errorHandler;
