const Permissions = require("../constants/Permissions");
const {
  RegisterUser,
  LoginUser,
  createRole,
} = require("../controller/user_controller");
const { authentication } = require("../middleware/auth");

const router = require("express").Router();


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: ثبت‌نام کاربر جدید
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: mohammad
 *               email:
 *                 type: string
 *                 example: mohammad@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: ثبت‌نام با موفقیت انجام شد
 *       400:
 *         description: اطلاعات ناقص
 *       500:
 *         description: خطای سرور هنگام ثبت‌نام
 */


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: ورود کاربر با ایمیل و رمز عبور
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: mohammad@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: ورود موفق با JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *       404:
 *         description: کاربر پیدا نشد
 *       500:
 *         description: خطای سرور
 */


/**
 * @swagger
 * /user/role/create:
 *   post:
 *     summary: ایجاد نقش جدید (فقط با دسترسی CREATE_VARIANT)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 example: مدیریت
 *               color:
 *                 type: string
 *                 example: red
 *     responses:
 *       200:
 *         description: نقش با موفقیت ایجاد شد
 *       403:
 *         description: دسترسی غیرمجاز
 *       500:
 *         description: خطا در ساخت نقش
 */

/**
 * @swagger
 * /user/role/add:
 *   post:
 *     summary: اختصاص نقش به کاربر (فقط با دسترسی ADD_ROLE)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - role_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 12
 *               role_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: نقش با موفقیت به کاربر اختصاص داده شد
 *       403:
 *         description: دسترسی غیرمجاز
 *       500:
 *         description: خطا در اختصاص نقش
 */






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
