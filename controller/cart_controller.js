"use strict";

const db = require("../service/database");

const date = new Date().toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

async function create_cart(user_id) {
    if(!user_id) return res.json({
        success: false,
        messeage: "شناسه کاربر وارد نشده"
    })
    const usercart = await get_user_cart(user_id)
    if(usercart.cart_id) return usercart
    else if(usercart.success === false) return usercart
   const sql = "INSERT INTO cart(user_id,create_time) VALUES(?,?)"
   return new Promise((resolve, reject) => {
    db.query(sql,[user_id, date], (err, result) => {
        if(err) return reject({
            success: false,
            messeage: err.message
        })
        return resolve({
            success: true,
            cart_id: result.insertId
        })
    })
   })
}


async function get_user_cart(user_id) {
     if(!user_id) return res.json({
        success: false,
        messeage: "شناسه کاربر وارد نشده"
    })
    return new Promise((resolve, reject) => {
    db.query("SELECT id FROM cart WHERE user_id = ?",user_id, (err, result) => {
        if(err) return reject({
            success: false,
            messeage: err.message
        })
        
        
        return resolve({
            success: true,
            cart_id: result[0].id
        })
    })
   })
}

async function add_item(req, res) {
    const {name , model , price} = req.body;
    const cart = await create_cart(req.user.id)
    console.log(cart);
    
    if(!name) return res.json({
        success: false, 
        message: "نام محصول وارد نشد"
    })
    if(!model) return res.json({
        success: false, 
        message: "مدل محصول وارد نشد"
    })
    if(!price) return res.json({
        success: false, 
        message: "قیمت محصول وارد نشد"
    })
    const sql = "INSERT INTO cart_item (cart_id, name, model, price, create_time) VALUES (?,?,?,?,?)"
    db.query(sql,[cart.cart_id, name, model, price, date], async (err, result) => {
        if(err) return res.json({
            success: false,
            message: "مشکلی در اضافه کردن محصول به سبد خرید گش امد دوباره امتحان کنید"
        })
        res.json({
            success: true,
            message: "به سبد خرید اضافه شد"
        })
    })

}
async function get_cart_item(req, res) {
    const cart = await get_user_cart(req.user.id)
    db.query("SELECT * FROM cart_item WHERE cart_id = ?", cart.cart_id, (err, result) => {
        if(err) return res.json({
            success: false,
            message: "خطا در گرفتن اطلاعات" + " " + err.message
        })
        res.json({
            success: true,
            result
        })
    })

}

async function update_count(req, res) {
    const id = req.params.id
    if(!id) return res.json({
        success: false,
        message: "ایدی را وارد نکردید"
    })
    const sql = "UPDATE cart_item SET count= count + 1 WHERE id=?"
    db.query(sql, id, (err, result) => {
        if(err) return res.json({
            success: false,
            message: "در اپدیت تعداد محصول مشکلی به وجود امد دوباره امتحان کنید" + " " + err.message
        })
        res.json({
            success: true,
            message: "با موفیقت اپدیت شد"
        })
    })
}

module.exports = {
    create_cart,
    get_user_cart,
    add_item,
    get_cart_item,
    update_count
}