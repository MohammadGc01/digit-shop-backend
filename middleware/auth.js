const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authorization(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "هدر Authorization معتبر نیست." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    return res.status(401).json({ message: "توکن منقضی یا نامعتبر است." });
  }
}

async function authentication(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "هدر Authentication معتبر نیست." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "توکن منقضی یا نامعتبر است." });
  }
}

module.exports = {
  authorization,
  authentication,
};
