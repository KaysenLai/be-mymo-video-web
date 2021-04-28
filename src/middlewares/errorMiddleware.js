import config from '../config/app.js';

const notFoundHandler = async (req, res, next) => {
  const error = new Error(`404 Not Found: ${config.BASE_URL}${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = async (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};

export { notFoundHandler, errorHandler };
