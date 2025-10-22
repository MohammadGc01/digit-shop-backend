const Permission = require("../constants/Permission");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authentication(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "شما باید لاگین کنید" });
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

async function authorization(req, res, permission_requir) {
  if (!req.user)
    return res.status(401).json({ message: "شما باید لاگین کنید" });
  const permission_name = req.user.permissions.map(
    (permission) => permission.permission_name
  );
  if (permission_name.includes(Permission.ADMINISTRATOR) || permission_name.includes(permission_requir)) return true;
  else return false
}

module.exports = {
  authentication,
  authorization,
};
