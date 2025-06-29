const db = require("../database/connection");
const bcrypt = require("bcrypt");
const logger = require("../services/logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function RegisterUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const log = new logger(
      "warn",
      `ثبت‌نام ناموفق به دلیل نبود اطلاعات کامل | IP: ${req.ip}`
    );
    await log.save();
    return res.status(400).json({
      success: false,
      message: "لطفاً نام کاربری، ایمیل و رمز عبور را وارد کنید",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users(username, email, password, role) VALUES (?, ?, ?, ?)`;

  db.query(
    sql,
    [username, email, hashPassword, "user"],
    async (err, result) => {
      if (err) {
        const log = new logger(
          "error",
          `خطا در ثبت‌نام کاربر: ${username} | جزئیات خطا: ${err.message}`
        );
        await log.save();
        return res.status(500).send("ثبت‌نام با مشکل مواجه شد");
      }

      const log = new logger(
        "info",
        `ثبت‌نام موفق: نام کاربری ${username} | ایمیل ${email}`
      );
      await log.save();

      res.json({
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد",
      });
    }
  );
}

async function LoginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const log = new logger(
      "warn",
      `ورود ناموفق به دلیل نبود اطلاعات کامل | IP: ${req.ip}`
    );
    await log.save();
    return res.json("لطفاً نام کاربری، ایمیل و رمز عبور را وارد کنید");
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, email, async (err, result) => {
    if (err) {
      const log = new logger(
        "error",
        `خطا در ورود کاربر: ${email} | جزئیات خطا: ${err.message}`
      );
      await log.save();
      return res.status(500).send("ورود شما با مشکل مواجه شد");
    }

    if (result.length === 0) {
      const log = new logger(
        "info",
        `
         یک درخواست ورود با IP : ${req.ip} زده اما کاربری با این ایمیل ${email} نبود 
        `
      );
      await log.save();
      res.status(404).json({
        success: false,
        message: "کاربری با این ایمیل یافت نشد",
      });
      return;
    }

    const user = result[0];
    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      const log = new logger(
        "warn",
        `
            کاربری که با ایپی : ${req.ip} درخواست ورود به حساب داده بود پسوردش نادرست بود 
          `
      );
      await log.save();
      res.json({
        message: "پسورد نادرست است دوباره امتحان کنید",
      });
      return;
    }

    const roles = await get_user_role(user);

    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: [roles],
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const log = new logger(
      "info",
      `
      کاربر ${user.username} با ایمیلی ${user.email} با موفقیت وارد شد
      `
    );
    await log.save();
    res.json({
      success: true,
      message: "ورود با موفقیت انجام شد",
      token: token,
    });
  });
}

async function createRole(req, res) {
  const { name, color } = req.body;
  const sql = "INSERT INTO roles(name,color) VALUES (?,?)";
  db.query(sql, [name, color], async (err, result) => {
    if (err) {
      const log = new logger(
        "error",
        `
        خطایی در هنگام ایجاد نقش رخ داد
        `
      );
      await log.save();
      return res.json({
        message: "خطایی در هنگام ایجاد نقش رخ داد",
        status: 500,
      });
    }

    const log = new logger(
      "info",
      `
            نقش ${name} با رنگ ${color} با موفقیت ایجاد شد
            `
    );
    await log.save();
    res.json({
      success: true,
      message: "نقش با موفقیت ایجاد شد",
    });
  });
}

async function get_user_role(user) {
  const [roleRow] = await new Promise((resolve, reject) => {
    db.query(
      "SELECT role_id FROM user_role WHERE user_id = ?",
      [user.id],
      (err, result) => {
        if (err) return reject(err);
        if (!result.length) return resolve([]);
        resolve(result);
      }
    );
  });

  const [roleData] = await new Promise((resolve, reject) => {
    db.query(
      "SELECT id ,name,color FROM roles WHERE id = ?",
      [roleRow.role_id],
      (err, result) => {
        if (err) return reject(err);
        if (!result.length) return resolve([]);
        resolve(result);
      }
    );
  });

  return roleData;
}

module.exports = {
  RegisterUser,
  LoginUser,
  get_user_role,
  createRole,
};
