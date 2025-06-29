const db = require("../database/connection");
const logger = require("../services/logger");

async function add_product(req, res) {
  const { name, img_path, description } = req.body;
  if (!name || !img_path || !description) {
    const log = new logger(
      "warn",
      `ثبت محصول ناموفق به دلیل نبود اطلاعات کامل | IP: ${req.ip}`
    );
    await log.save();
    return res.status(400).json({
      success: false,
      message: "درخواستی که دادید هیچ بدنه ای نداره ",
    });
  }

  const sql =
    "INSERT INTO products(name , img_path , description) VALUE(?,?,?)";
  db.query(sql, [name, img_path, description], async (err, result) => {
    if (err) {
      const log = new logger(
        "error",
        `خطا در ثبت محصول || جزئیات خطا: ${err.message}`
      );
      await log.save();

      res.status(500).json({
        message: `موقع query با مشکل مواجه شد پیام خطا : ${err.message}`,
      });
      return;
    }

    const log = new logger(
      "info",
        `محصول جدیدی با موفقیت اضافه شد ✅`
    );
    await log.save();
    res.json({
      message: "محصول شما با موفقیت اضافه شد ✅",
    });
  });
}

async function add_variant(req, res) {
  const { label, price, product_id } = req.body;

  if ( !label || !price || !product_id) {
    const log = new logger(
      "warn",
      `ثبت وارینت محصول ناموفق به دلیل نبود اطلاعات کامل | IP: ${req.ip}`
    );
    await log.save();
    return res.status(400).json({
      success: false,
      message: "درخواستی که دادید هیچ بدنه ای نداره ",
    });
  }

  const sql =
    "INSERT INTO product_variant(label , price , product_id) VALUE(?,?,?)";

  db.query(sql, [label, price, product_id], async (err, result) => {
    if (err) {
      const log = new logger(
        "error",
        `خطا در ثبت  وارینت محصول || جزئیات خطا: ${err.message}`
      );
      await log.save();

      res.status(500).json({
        message: `موقع query با مشکل مواجه شد پیام خطا : ${err.message}`,
      });
      return;
    }

    const log = new logger(
      "info",
      `
        وارینت محصول جدیدی با موفقیت اضافه شد ✅
        `
    );
    await log.save();
    res.json({
      message: "وارینت محصول شما با موفقیت اضافه شد ✅",
    });
  });
}

module.exports = {
  add_product,
  add_variant,
};
