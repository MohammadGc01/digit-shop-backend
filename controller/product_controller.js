"use strict";

const db = require("../service/database");

const date = new Date().toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});



async function create_product(req, res) {
  const { name, description, category_id, sub_category_id, brand_id } =
    req.body;
  if (!name)
    return res.json({ success: false, message: "نام محصول را وارد نکردید" });
  if (!description)
    return res.json({
      success: false,
      message: "دیسکریپشن محصول را وارد نکردید",
    });
  if (!category_id)
    return res.json({
      success: false,
      message: "شناسه دسته بندی محصول را وارد نکردید",
    });
  if (!sub_category_id)
    return res.json({
      success: false,
      message: "شناسه زیر مجموعه دسته بندی محصول را وارد نکردید",
    });
  if (!brand_id)
    return res.json({
      success: false,
      message: "شناسه برند محصول را وارد نکردید",
    });
  const sql =
    "INSERT INTO products(name, description,category_id, sub_category_id, brand_id, create_time) VALUES (?,?,?,?,?,?)";
  db.query(
    sql,
    [name, description, category_id, sub_category_id, brand_id, date],
    (err, result) => {
      if (err)
        return res.json({
          success: false,
          message: `خطا در ثبت محصول جدید : ${err.message}`,
        });

      res.json({
        success: true,
        message:
          "محصول شما با موفقیت ایجاد شد حالا باید واریان محصول را وارد کنید",
      });
    }
  );
}

async function create_product_variant(req, res) {
  const { name, price, product_id } = req.body;
  if (!name)
    return res.json({ success: false, message: "نام variant را وارد نکردید" });
  const sql =
    "INSERT INTO product_varients(name, price, product_id, create_time) VALUES (?,?,?,?)";
  db.query(sql, [name, price, product_id, date], (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: `خطا در ثبت محصول جدید : ${err.message}`,
      });
    res.json({
      success: true,
      message: "variant با موفقیت ساخته شد",
    });
  });
}

async function upload_product_img(req, res) {
  const product_id = req.body.product_id;
  const filename = req.body.file_base_name;
  const sql =
    "INSERT INTO product_img( name, create_time, product_id) VALUES (?,?,?)";
  db.query(sql, [filename, date, product_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ error: "خطا در ثبت تصویر در پایگاه داده" });
    }

    res.json({
      message: "آپلود با موفقیت انجام شد",
      filename: req.file.filename,
      url: `public/img/product/${req.file.filename}`,
    });
  });
}

// این قسمت از کد موقط هستش
async function get_products(req, res) {
  const sql = `SELECT products.*, product_varients.* ,
   products.name AS products_name,
   product_varients.id AS variants_id,
   product_varients.name AS variants_name  
   
  FROM products JOIN product_varients ON products.id = product_varients.product_id `;
  db.query(sql, (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err.message,
      });
    const products = result.reduce((acc, row) => {
      let product = acc.find((p) => p.id === row.product_id);
      if (!product) {
        product = {
          id: row.product_id,
          name: row.products_name,
          create_time: row.create_time,
          variants: [],
        };
        acc.push(product);
      }

      product.variants.push({
        variants_id: row.variants_id,
        variants_name: row.variants_name,
        price: row.price,
        discount: row.discount,
      });

      return acc;
    }, []);

    res.json({
      success: true,
      result: products,
    });
  });
}

module.exports = {
  create_product,
  upload_product_img,
  create_product_variant,
  get_products,
};
