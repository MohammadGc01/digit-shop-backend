const db = require("../database/connection");
const bcrypt = require("bcrypt");
const logger = require("../services/logger");
const jwt = require("jsonwebtoken");
const mailler = require("../services/mailler");
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

  const sql = `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`;

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

      const role_id = await new Promise( (resolve , reject) => {
        db.query("SELECT * FROM roles WHERE set_defualt_role = 1", (role_err , role_result) => {
          if(role_err) return reject(role_err)
            resolve(role_result[0].id)
        });
      })
      const user_id = result.insertId;

      const sql2 = `INSERT INTO user_role(user_id, role_id) VALUES (?, ?)`;
      const role_insert_result = await new Promise((resolve , reject) => {
         db.query(sql2, [user_id, role_id], (insertErr , insertResult) =>{
          if(insertErr) return reject(insertErr)
            resolve(insertResult)
         })
      })


      const log = new logger(
        "info",
        `ثبت‌نام موفق: نام کاربری ${username} | ایمیل ${email}
        
        ${role_insert_result}
        
        `
      );
      await log.save();

      const mail = new mailler(email , `ثبت نام` , `ثبت نام شما موفقیت انجام شد`)
      await mail.send()

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

async function deleteRole(req, res) {
  const id = req.params.role_id
  if(!id) return res.json({message : "شما پارامتر ایدی را وارد نکردید"})
  
  db.query("DELETE FROM roles WHERE id = ?", [id], (err , result) => {
    if(err){
      return res.json({
        message : "موقع حذف رول مشکلی به وجود امد دوباره امتحان کنید"
      })
    }
     res.json({message : `رول ${result} با موفقیت حذف شد`})
  })
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


async function addRole(req, res) {
  const { user_id, role_id } = req.body;
  if (!user_id || !role_id) {
    return res.json({
      success: false,
      message: "لطفا تمام فیلد ها را پر کنید",
    });
  }

  // بررسی تکراری بودن
  const checkSql = "SELECT * FROM user_role WHERE user_id = ? AND role_id = ?";
  db.query(checkSql, [user_id, role_id], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "خطایی رخ داده است",
      });
    }
    if (result.length > 0) {
      return res.json({
        success: false,
        message: "این کاربر قبلاً این نقش را دارد",
      });
    }

    // اضافه کردن نقش
    const sql = "INSERT INTO user_role(user_id, role_id) VALUES (?, ?)";
    db.query(sql, [user_id, role_id], (err2, result2) => {
      if (err2) {
        return res.json({
          success: false,
          message: "خطایی رخ داده است",
        });
      }
      if (result2.affectedRows === 0) {
        return res.json({
          success: false,
          message: "نقش اضافه نشد",
        });
      }
      res.json({
        success: true,
        message: "نقش با موفقیت اضافه شد",
      });
    });
  });
}
async function removeRole(req , res) {
  const id = req.params.user_id
 if(!id){
  return res.json({message : "شما پارامتر ایدی را وارد نکردید"})
 }  
 
 db.query("DELETE FROM user_role WHERE user_id", [id], async (err , result) => {
   if(err) return res.json({message : "موقع گرفتن رول یوزر مشکلی پیش اومد"})
    res.json({message : "رول کاربر گرفته شد"})  
 })

}
module.exports = {
  RegisterUser,
  LoginUser,
  get_user_role,
  createRole,
  deleteRole,
  addRole,
  removeRole
};
