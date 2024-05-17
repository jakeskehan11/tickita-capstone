const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "Computer Technician" && role !== "PPSS") {
    return res
      .status(403)
      .send("Forbidden: You are not authorized to access this resource");
  }

  next();
};

module.exports = {
  requireAuth,
  isAdmin,
};
