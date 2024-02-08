const jwt = require("jsonwebtoken");
const { SECRET } = require("./envs");

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, SECRET, { expiresIn: "2d" });
  return token;
};

const validateToken = (token) => {
  const results = jwt.verify(token, SECRET);
  return results;
};

module.exports = { generateToken, validateToken };
