const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token || req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json("You are not authenticated!");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json("Token is missing!");
  }

  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    req.user = user;
    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that! Only admin.");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };