/**
 * page not found handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
};
