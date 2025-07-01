const Permissions = require("../constants/Permissions");
const {
  add_product,
  add_variant,
} = require("../controller/products_controller");
const { authorization, authentication } = require("../middleware/auth");
const { checkPermission } = require("../middleware/checkPermission");

const router = require("express").Router();

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: اضافه کردن یک محصول جدید
 *     tags: [Products]
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
 *               - img_path
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: گوشی سامسونگ A54
 *               img_path:
 *                 type: string
 *                 example: /images/products/a54.jpg
 *               description:
 *                 type: string
 *                 example: گوشی جدید سامسونگ با پردازنده قدرتمند
 *     responses:
 *       200:
 *         description: محصول شما با موفقیت اضافه شد ✅
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: محصول شما با موفقیت اضافه شد ✅
 *       400:
 *         description: اطلاعات ناقص
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: درخواستی که دادید هیچ بدنه ای نداره
 *       500:
 *         description: خطا در سمت سرور
 */

/**
 * @swagger
 * /products/variant/add:
 *   post:
 *     summary: اضافه کردن یک واریانت جدید برای محصول
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - price
 *               - product_id
 *             properties:
 *               label:
 *                 type: string
 *                 example: رنگ مشکی - سایز M
 *               price:
 *                 type: number
 *                 example: 2500000
 *               product_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: وارینت محصول شما با موفقیت اضافه شد ✅
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: وارینت محصول شما با موفقیت اضافه شد ✅
 *       400:
 *         description: اطلاعات ناقص
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: درخواستی که دادید هیچ بدنه ای نداره
 *       500:
 *         description: خطا در سمت سرور
 */

router.post("/add", authentication, async (req, res) => {
  const user = await authorization(req);
  const canAccess = await checkPermission(
    user.role,
    Permissions.CREATE_PRODUCTS
  );
  if (!canAccess)
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  add_product(req, res);
});

router.post("/variant/add", authentication, async (req, res) => {
  const user = await authorization(req);
  const canAccess = await checkPermission(
    user.role,
    Permissions.CREATE_VARIANT
  );
  if (!canAccess)
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  add_variant(req, res);
});



module.exports = router;
