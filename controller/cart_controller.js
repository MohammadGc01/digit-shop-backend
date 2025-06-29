const db = require("../database/connection");
const logger = require("../services/logger");

async function check_user_cart(user_id) {
  const sql = "SELECT * FROM cart WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function create_cart(user_id) {
  const user_cart = await check_user_cart(user_id);
  if (user_cart.length > 0) {
    return user_cart;
  } else {
    const sql = "INSERT INTO cart (user_id) VALUES (?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [user_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("user cart : ", result);

          resolve(result);
        }
      });
    });
  }
}

async function add_cart(req, res) {
  const { user_id, product_id, variant_id, price_each } = req.body;
  if (!user_id || !product_id || !variant_id || !price_each) {
    return res.status(400).json({ message: "درخواست شما هیچ بدنه ای ندارد" });
  }
  const cart = await create_cart(user_id);
  const sql =
    "INSERT INTO cart_items(cart_id,product_id,variant_id,quantity, price_each) VALUES (?,?,?,1,?)";
  db.query(
    sql,
    [cart[0].id, product_id, variant_id, price_each],
    async (err, result) => {
      if (err) {
        const log = new logger(
          "error",
          `
            message: "Error adding item to cart", error:
            ${err}
            `
        );
        await log.save();
        return res
          .status(500)
          .json({ message: "Error adding item to cart", error: err });
      }
      res.json({ message: "محصول به سبد خرید شما اضافه شد ✅" });
    }
  );
}

async function update_quantity(req, res) {
  const cart_item_id = req.params.cart_item_id;
  const sql = "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?";

  db.query(sql, [cart_item_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating quantity" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Quantity updated successfully" });
  });
}

async function delete_item(req , res) {
    const cart_item_id = req.params.cart_item_id;
    if(!cart_item_id){
      return res.json({message : "شما پارامتر کارت ایتم ایدی را فراموش کرده اید" })
    }
    const sql = "DELETE FROM cart_items WHERE id = ?"
    db.query(sql , [cart_item_id], async (err , result) => {
        if(err){
        return  res.json({message : `
             موقع حذف ایتم از سبد خرید مشکلی پیش آمده است  لطفا دوباره امتحان کنید 
            `})
        }      

            if (result.affectedRows === 0) {
      return res.status(404).json({ message: "آیتمی با این شناسه پیدا نشد" });
    }


        res.json({message : "ایتم با موفقیت از سبد خرید حذف شد ✅"})
    })
}

module.exports = {
  add_cart,
  update_quantity,
  delete_item,
};
