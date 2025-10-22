"use strict";
const Permission = require("../constants/Permission");
const {
  login,
  register,
  create_role,
  add_role,
  add_permission,
  edit_role,
  get_users_list,
  get_roles_list,
  delete_role,
  set_defualt_role,
  unset_defualt_role,
} = require("../controller/user_controller");
const { authentication, authorization } = require("../middleware/auth");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);

router.post("/role/create", authentication, async (req, res) => {
  const Access = await authorization(req, res, Permission.CREATE_ROLE);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  create_role(req, res);
});
router.post("/role/add", authentication, async (req, res) => {
  const Access = await authorization(req, res, Permission.ADD_ROLE);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  const { role_id, user_id } = req.body;
  const result = add_role(role_id, user_id);
  res.json(result);
});

router.post("/role/permission/add/:role_id", async (req, res) => {
  const Access = await authorization(req, res, Permission.ADD_ROLE);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  add_permission(req, res);
});

router.put("/role/update/:id", authentication, async (req, res) => {
  const Access = await authorization(req, res, Permission.EDIT_ROLE);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  edit_role(req, res);
});

router.delete("/role/delete/:id",authentication, async (req, res) => {
  const Access = await authorization(req, res, Permission.DELETE_ROLE);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  delete_role(req, res);
});

router.delete("/role/permission/delete/:id", authentication, async (req, res) => {
    const Access = await authorization(req, res, Permission.DELETE_ROLE);
    if (!Access)
      return res.json({
        success: false,
        message: "شما به این بخش دسترسی ندارید",
      });
  }
);






router.put("/role/update/set_defualt_role/:role_id", async (req , res) => {
  await set_defualt_role(req,res)
})
router.put("/role/update/unset_defualt_role/:role_id", async (req, res) => {
  await unset_defualt_role(req, res);
});

router.get("/all", async (req, res) => {
 await get_users_list(req, res)
})
router.get("/roles/all", async (req, res) => {
  await get_roles_list(req, res);
});

module.exports = router;
