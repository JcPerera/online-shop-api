const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");
  if (authHeader) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SEC);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send("Invalid Token");
    }
  } else {
    return res.status(403).send("A token is required for authentication");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
