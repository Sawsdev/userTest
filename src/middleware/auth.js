const jwt = require("jsonwebtoken");
const { Config } = require("../config");
const { Response } = require("../common/response");

const validateToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("You need permissions to continue");
  }
  try {
    const decode = jwt.verify(token, Config.tokenSecret);
    req.user = decode;
  } catch (error) {
    Response.error(res);
  }

  return next();
};

module.exports = validateToken;
