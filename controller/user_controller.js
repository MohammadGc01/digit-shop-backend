"use strict";
const jwt = require("jsonwebtoken");
const db = require("../service/database");
const bcrypt = require("bcrypt");

const date = new Date().toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

async function login(req, res) {
  const { email, password } = req.body;
  if (!email)
    return res.json({ success: false, message: "ایمیل خود را وارد نکردید" });
  if (!password)
    return res.json({
      success: false,
      message: " رمز عبور خود را وارد نکردید",
    });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    async (err, result) => {
      if (err)
        return res.json({
          success: false,
          message: `یورود با مشکل مواجه شد دوباره امتحان کنید  ${err.message}`,
        });
      if (!result[0])
        return res.json({
          success: false,
          message: "حساب کاربری با این ایمیل پیدا نشد",
        });
      const PassIsMatch = await bcrypt.compare(password, result[0].password);
      if (!PassIsMatch)
        return res.json({ success: false, message: "رمز عبور نادرست است" });
      const user = result[0];

      const rolesData = await get_user_roles(user.id);
      if (rolesData.success == false) return res.json(rolesData);
      const roles_id = await rolesData.map((role) => role.id);
      const permissionsDATA = await get_role_permissions(roles_id);
      if (permissionsDATA.success == false) return res.json(permissionsDATA);

      const token = await jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          roles: rolesData,
          permissions: permissionsDATA,
        },
        process.env.SECRET_KEY
      );

      res.json({
        success: true,
        message: "ورود موفقیت امیز بود",
        token,
      });
    }
  );
}

async function register(req, res) {
  const id = Math.floor(Math.random() * 10000);
  const { firstname, lastname, email, password, phonenumber } = req.body;
  if (!phonenumber)
    return res.json({
      success: false,
      message: "شماره تلفن خود را وارد نکردید",
    });
  if (!firstname || !lastname)
    return res.json({
      success: false,
      message: "نام یا نام خوانوادگی خود را وارد نکردید",
    });
  if (!email)
    return res.json({ success: false, message: "ایمیل خود را وارد نکردید" });
  if (!password)
    return res.json({
      success: false,
      message: " رمز عبور خود را وارد نکردید",
    });

  const DEfualtRole = await get_set_defualt_role();

  const hashpassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users(id,firstname,lastname,email,phonenumber,password,create_time) VALUES (?,?,?,?,?,?,?)";

  db.query(
    sql,
    [id, firstname, lastname, email, phonenumber, hashpassword, date],
    async (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: `مشکلی در ثبت نام به وجود امد دوباره امتحام کنید : ${err.message}`,
        });
      }

      await add_role(DEfualtRole[0].id, id);

      res.json({
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
      });
    }
  );
}

async function create_role(req, res) {
  const id = Math.floor(Math.random() * 10000);
  const name = req.body.name;
  if (!name)
    return res.json({ success: false, message: "شما نام رول را وارد نکردید" });
  const sql = "INSERT INTO roles(id , name , create_time) VALUES(?,?,?)";
  db.query(sql, [id, name, date], (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: `مشکلی در ساخت به وجود امد دوباره امتحان کنید : ${err.message}`,
      });
    res.json({ success: true, message: "رول با موفقیت ساخته شد" });
  });
}

async function add_role(role_id, user_id) {
  const id = Math.floor(Math.random() * 10000);

  if (!role_id)
    return {
      success: false,
      message: "شما ایدی رول را وارد نکردید",
    };
  if (!user_id)
    return {
      success: false,
      message: "شما ایدی کاربر را وارد نکردید",
    };
  const sql =
    "INSERT INTO user_roles(id , role_id , user_id, create_time) VALUES(?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [id, role_id, user_id, date], (err, result) => {
      if (err)
        return reject({
          success: false,
          message: `مشکلی پیش اومد دوباره امتحان کنید`,
        });
      return resolve({
        success: true,
        message: "رول با موفقیت به کاربر اضافه شد",
      });
    });
  });
}

async function add_permission(req, res) {
  const role_id = req.params.role_id;
  const permission_name = req.body.permission_name;
  if (!role_id)
    return res.json({
      success: false,
      message: "ایدی رول مورد نظر وارد نکردید",
    });
  if (!permission_name)
    return res.json({ success: false, message: "اسم پرمیشن را وارد کنید" });
  const sql =
    "INSERT INTO role_permissions(role_id , permission_name) VALUES(?,?)";
  db.query(sql, [role_id, permission_name], (err, result) => {
    if (err) return res.json({ success: false, message: err.message });
    res.json({
      success: true,
      message: "پرمیشن مورد نظر اضافه شد",
    });
  });
}

async function get_user_roles(user_id) {
  if (!user_id)
    return {
      success: false,
      message: "شناسه کاربر وارد نشده",
    };
  const roleRow = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM user_roles WHERE user_id = ?",
      user_id,
      (err, result) => {
        if (err) return reject({ success: false, message: err.message });
        return resolve(result || []);
      }
    );
  });

  const roles_id = roleRow.map((role) => role.role_id);
  const placeholders = await roles_id.map(() => "?").join(",");
  const sql = `SELECT DISTINCT * FROM roles WHERE id IN (${placeholders})`;

  return new Promise((resolve, reject) => {
    db.query(sql, roles_id, (err, result) => {
      if (err) return reject({ success: false, message: err.message });
      return resolve(result);
    });
  });
}

async function get_role_permissions(roles_id) {
  if (!roles_id)
    return {
      success: false,
      message: "شناسه رول هارو وارد نکردید",
    };

  const placeholders = await roles_id.map(() => "?").join(",");
  const sql = `SELECT DISTINCT permission_name FROM role_permissions WHERE role_id IN (${placeholders})`;
  return new Promise((resolve, reject) => {
    db.query(sql, roles_id, (err, result) => {
      if (err) return reject({ success: false, message: err.message });
      return resolve(result);
    });
  });
}

async function delete_role(req, res) {
  const id = req.params.id;
  if (!id)
    return res.json({ success: false, message: "شما ایدی را وارد نکردید" });

  db.query(
    `DELETE FROM role_permissions WHERE role_id = ?`,
    id,
    (err, result) => {
      if (err)
        return res.json({
          success: false,
          message: err.message,
        });
    }
  );

  db.query(`DELETE FROM user_roles WHERE role_id = ?`, id, (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err.message,
      });
  });

  db.query(`DELETE FROM roles WHERE id = ?`, id, (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err.message,
      });
    res.json({
      success: true,
      message: "رول با موفقیت حذف شد",
    });
  });
}

async function delete_permission(req, res) {
  const id = req.params.id;
  if (!id)
    return res.json({ success: false, message: "شما ایدی را وارد نکردید" });

  db.query(`DELETE FROM role_permissions WHERE id = ?`, id, (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err.message,
      });
    res.json({
      success: true,
      message: "پرمیشن با موفقیت حذف شد",
    });
  });
}

async function edit_role(req, res) {
  const id = req.params.id;
  if (!id)
    return res.json({ success: false, message: "شما ایدی را وارد نکردید" });
  const { name, set_defualt_role } = req.body;
  if ((!name, !set_defualt_role))
    return res.json({
      success: false,
      message: "شما مقدار رول را وارد نکردید",
    });
  const sql = "UPDATE roles SET name = ? , set_defualt_role= ? WHERE id = ?";
  db.query(sql, [name, set_defualt_role, id], (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err.message,
      });
    res.json({
      success: true,
      message: "رول با موفقیت اپدیت شد",
    });
  });
}

async function set_defualt_role(req, res) {
  const role_id = req.params.role_id;
  if (!role_id)
    return res.json({
      success: false,
      message: "ایدی رول را وارد نکردید",
    });

  const DEfualtRole = await get_set_defualt_role();
 
  if (DEfualtRole[0])
    return res.json({
      success: false,
      message: `یک رول را قبلا به عنوان رول دیفالت انتخاب کردید`,
    });

  const sql = "UPDATE roles SET set_defualt_role = ? WHERE id = ?";
  db.query(sql, ["true", role_id], (err, result) => {
    if (err)
      return res.json({
        success: false,
        message:
          "در اپدیت رول مشکلی به وجود امد دوباره امتحان کنید" +
          " " +
          err.message,
      });
    res.json({
      success: true,
      message: "رول با موفقیت اپدیت شد",
    });
  });
}

async function unset_defualt_role(req, res) {
const role_id = req.params.role_id;
if (!role_id)
  return res.json({
    success: false,
    message: "ایدی رول را وارد نکردید",
  });

const sql = "UPDATE roles SET set_defualt_role = ? WHERE id = ?";
db.query(sql, ["false", role_id], (err, result) => {
  if (err)
    return res.json({
      success: false,
      message:
        "در اپدیت رول مشکلی به وجود امد دوباره امتحان کنید" + " " + err.message,
    });
  res.json({
    success: true,
    message: "رول با موفقیت اپدیت شد",
  });
});
}

async function get_set_defualt_role() {
  return await new Promise((resolve, reject) => {
    db.query(
      "SELECT id FROM roles WHERE set_defualt_role = 'true'",
      (err, result) => {
        if (err) console.log(err);
        return resolve(result);
      }
    );
  });
}

async function get_users_list(req, res) {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    res.json(result);
  });
}
async function get_roles_list(req, res) {
  let sql = "SELECT * FROM roles";
  db.query(sql, (err, result) => {
    res.json(result);
  });
}

module.exports = {
  login,
  register,
  create_role,
  add_role,
  add_permission,
  get_user_roles,
  get_role_permissions,
  delete_role,
  delete_permission,
  edit_role,
  get_users_list,
  get_roles_list,
  set_defualt_role,
  unset_defualt_role,
};
