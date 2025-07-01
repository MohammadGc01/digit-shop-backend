const { add_cart, update_quantity, delete_item } = require('../controller/cart_controller')
const { authentication } = require('../middleware/auth')

const router = require('express').Router()


/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: اضافه کردن محصول به سبد خرید
 *     tags: [Cart]
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
 *               - product_id
 *               - variant_id
 *               - price_each
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 5
 *               product_id:
 *                 type: integer
 *                 example: 12
 *               variant_id:
 *                 type: integer
 *                 example: 3
 *               price_each:
 *                 type: number
 *                 example: 2490000
 *     responses:
 *       200:
 *         description: محصول به سبد خرید شما اضافه شد ✅
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: محصول به سبد خرید شما اضافه شد ✅
 *       400:
 *         description: بدنه‌ی درخواست ناقص است
 *       500:
 *         description: خطا در سمت سرور هنگام افزودن محصول
 */


/**
 * @swagger
 * /cart/update/quantity/{cart_item_id}:
 *   post:
 *     summary: افزایش تعداد یک آیتم از سبد خرید
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cart_item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه آیتم در سبد خرید
 *     responses:
 *       200:
 *         description: تعداد با موفقیت افزایش یافت
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Quantity updated successfully
 *       404:
 *         description: آیتمی با این شناسه پیدا نشد
 *       500:
 *         description: خطا در بروزرسانی تعداد
 */
/**
 * @swagger
 * /cart/delete/item/{cart_item_id}:
 *   delete:
 *     summary: حذف آیتم از سبد خرید
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cart_item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه آیتم سبد خرید که می‌خواهید حذف کنید
 *     responses:
 *       200:
 *         description: آیتم با موفقیت حذف شد ✅
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ایتم با موفقیت از سبد خرید حذف شد ✅
 *       404:
 *         description: آیتم پیدا نشد
 *       500:
 *         description: خطا در حذف آیتم
 */




router.post("/add", authentication, (req , res) => {
    add_cart(req , res)
})

router.post('/update/quantity/:cart_item_id', authentication , (req , res) => {
     update_quantity(req , res)
})

router.delete('/delete/item/:cart_item_id', authentication , (req , res) => {
      delete_item(req , res)
})



module.exports = router