/**
 * Route error handlers
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ msg: err.message });
};
