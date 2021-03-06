function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    return res.status(401).json({ message: 'The user is not authorized' });
  }

  if (err.name === 'ValidationError') {
    //  validation error
    return res.status(401).json({ message: err });
  }

  // 500 server error as default
  return res.status(500).json(err);
}

module.exports = errorHandler;
