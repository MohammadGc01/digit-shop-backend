| Method | Endpoint                              | توضیح کوتاه                      | سطح دسترسی        | ورودی (Body / Params)                           | خروجی (Response)                  |
| ------ | ------------------------------------- | -------------------------------- | ----------------- | ----------------------------------------------- | --------------------------------- |
| POST   | `/user/register`                      | ثبت‌نام کاربر جدید               | Public            | `{ username, email, password }`                 | `{ success, message }`            |
| POST   | `/user/login`                         | ورود کاربر                       | Public            | `{ email, password }`                           | `{ success, message, token }`     |
| POST   | `/user/role/create`                   | ایجاد نقش جدید                   | Admin (با پرمیشن) | `{ name, color }`                               | `{ success, message }`            |
| POST   | `/products/add`                       | افزودن محصول جدید                | Admin (با پرمیشن) | `{ name, description, price, ... }`             | `{ success, message, productId }` |
| POST   | `/products/variant/add`               | افزودن وریانت به محصول           | Admin (با پرمیشن) | `{ productId, variantName, variantPrice, ... }` | `{ success, message, variantId }` |
| POST   | `/cart/add`                           | افزودن کالا به سبد خرید          | User (احراز هویت) | `{ productId, quantity }`                       | `{ success, message, cartItem }`  |
| POST   | `/cart/update/quantity/:cart_item_id` | به‌روزرسانی تعداد یک آیتم در سبد | User (احراز هویت) | `param: cart_item_id`، `body: { quantity }`     | `{ success, message }`            |
| DELETE | `/cart/delete/item/:cart_item_id`     | حذف آیتم از سبد خرید             | User (احراز هویت) | `param: cart_item_id`                           | `{ success, message }`            |
