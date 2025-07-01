const Permissions = require("../constants/Permissions");
const {
  RegisterUser,
  LoginUser,
  createRole,
} = require("../controller/user_controller");
const { authentication } = require("../middleware/auth");

const router = require("express").Router();

router.post("/login", (req, res) => {
  LoginUser(req, res);
});

router.post("/register", (req, res) => {
  RegisterUser(req, res);
});

router.post("/role/create", authentication, async (req, res) => {
  const user = await authorization(req);
  const canAccess = await checkPermission(user.role,Permissions.CREATE_VARIANT);
  if (!canAccess) return res.status(403).json({ message: "You do not have permission to perform this action" });
  createRole(req, res);
});

router.post('/role/add', authentication, async (req, res) => {
  const user = await authorization(req);
  const canAccess = await checkPermission(user.role,Permissions.ADD_ROLE);
  if (!canAccess) return res.status(403).json({ message: "You do not have permission to perform this action" });
  addRole(req, res);
});
module.exports = router;
