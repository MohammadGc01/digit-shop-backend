| Method | Endpoint                              | توضیح کوتاه                      | سطح دسترسی             | ورودی (Body / Params)                             | خروجی (Response)                                                          |
| ------ | ------------------------------------- | -------------------------------- | ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| POST   | `/user/register`                      | ثبت‌نام کاربر جدید               | Public                 | `{ username, email, password }`                   | `{ success: true, message: "ثبت‌نام با موفقیت انجام شد" }`                |
| POST   | `/user/login`                         | ورود کاربر                       | Public                 | `{ email, password }`                             | `{ success: true, message, token }` یا خطا (پسورد اشتباه، کاربر یافت نشد) |
| POST   | `/user/role/create`                   | ایجاد نقش جدید                   | Admin (نیاز به پرمیشن) | `{ name, color }`                                 | `{ success: true, message: "نقش با موفقیت ایجاد شد" }`                    |
| POST   | `/products/add`                       | افزودن محصول جدید                | Admin (نیاز به پرمیشن) | `{ name, img_path, description }`                 | `{ message: "محصول شما با موفقیت اضافه شد" }`                             |
| POST   | `/products/variant/add`               | افزودن وارینت به محصول           | Admin (نیاز به پرمیشن) | `{ label, price, product_id }`                    | `{ message: "وارینت محصول شما با موفقیت اضافه شد" }`                      |
| POST   | `/cart/add`                           | افزودن کالا به سبد خرید          | User (احراز هویت)      | `{ user_id, product_id, variant_id, price_each }` | `{ message: "محصول به سبد خرید شما اضافه شد" }`                           |
| POST   | `/cart/update/quantity/:cart_item_id` | افزایش تعداد یک آیتم در سبد خرید | User (احراز هویت)      | پارامتر URL: `cart_item_id`                       | `{ message: "Quantity updated successfully" }`                            |
| DELETE | `/cart/delete/item/:cart_item_id`     | حذف آیتم از سبد خرید             | User (احراز هویت)      | پارامتر URL: `cart_item_id`                       | `{ message: "ایتم با موفقیت از سبد خرید حذف شد" }`                        |



