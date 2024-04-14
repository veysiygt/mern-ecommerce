const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticationMid = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

    if (!decodedData) {
      return res.status(401).json({ message: "Token not found" });
    }

    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };
};

module.exports = { authenticationMid, roleChecked };
