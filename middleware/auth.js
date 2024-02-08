const { validateToken } = require("../config/tokens");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log("there's no token");
    return res.sendStatus(401);
  }

  const { payload } = validateToken(token);
  if (!payload) {
    console.log("the token is invalid");
    return res.sendStatus(401);
  }

  req.user = payload;

  next();
}

module.exports = { validateAuth };
