const jwt = require("jsonwebtoken");
const { SECRET } = require("./envs");

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, SECRET, { expiresIn: "2d" });
  console.log("token generado ====> ",token);
  return token;
};

const validateToken = (token) => {
  const results = jwt.verify(token, SECRET);
  return results;
};

module.exports = { generateToken, validateToken };
