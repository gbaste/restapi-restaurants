const jwt = require("jsonwebtoken");
import { extractToken } from "../utils/utils";

const { SECRET, ADMINS } = process.env;

const generateApiKey = async (name) => {
  return jwt.sign({ name }, SECRET);
};

const checkIfValidKey = (req, res, next) => {
  const token = extractToken(req.get("Authorization"));
  try {
    if (!ADMINS.includes(jwt.verify(token, SECRET).name)) {
      next(e);
    }
  } catch (e) {
    next(e);
  }
  next();
};

module.exports = { generateApiKey, checkIfValidKey };
