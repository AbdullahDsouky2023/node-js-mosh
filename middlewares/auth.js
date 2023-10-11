const jwt = require("jsonwebtoken");
const config = require("../config");
function auth(req, res, next) {
  const token = req.header("x-auth");
  if (!token)
    return res
      .status(401)
      .send("Invalid permission you don't have the right permission");
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded
    next()
  } catch (err) {
    res.status(404).send("Invalid token");
  }
}


module.exports = auth