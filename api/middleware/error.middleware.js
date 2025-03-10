export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";
  res
    .status(statusCode)
    .json({ success: false, errorMessage, statusCode: statusCode });
};
 