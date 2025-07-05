const db = require("../database/connection");
const logger = require("../services/logger");
const { check_user_cart, get_cart_item } = require("./cart_controller");



async function create_order(req , res) {
    const user = req.user
    const cart = await check_user_cart(user.id)
    const cart_item = await get_cart_item(cart[0].id)
    let total_price = 0
    cart_item.forEach(item => {
        total_price = ++item.total_price
    });

    const sql_create_order = "INSERT INTO orders(user_id,total_price) VALUES(? , ?)" 
    const order = await new Promise((resolve , reject) => {
        db.query(sql_create_order,[user.id , total_price], (err , result) => {
            if(err){
                return res.json(err)
            }

            resolve(result)
        })
    })   

    const sql_add_Order_item = "INSERT INTO order_items(order_id , product_variant_id , product_id, quantity , price ) VALUES(?,?,?,?,?)"
    cart_item.forEach(item => {
        db.query(sql_add_Order_item , [order.insertId  , item.variant_id , item.product_id , item.quantity , item.total_price ] , (err , result) => {
            if(err) console.log(err);
            console.log(result);
        })
    })

    res.json({message : "سفارش شما ثبت شد"})

}

async function get_orders(req , res) {
    const user = req.user
    const sql = "SELECT * FROM orders WHERE user_id = ?"
    db.query(sql,[user.id], (err , result) => {
        if(err){
            return res.json({message : err.message})
        }
        res.json(result)
    })
}

module.exports = {
    create_order,
    get_orders
}   