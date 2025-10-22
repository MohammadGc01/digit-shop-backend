"use strict";

const multer = require("multer");
const Permission = require("../constants/Permission");
const {
  create_product,
  upload_product_img,
  create_product_variant,
  get_products,
} = require("../controller/product_controller");
const { authentication, authorization } = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();

router.post("/create", authentication, async (req, res) => {
  const Access = await authorization(req, res, Permission.CREATE_PRODUCT);
  if (!Access)
    return res.json({
      success: false,
      message: "شما به این بخش دسترسی ندارید",
    });
  create_product(req, res);
});

router.post("/variant/create", authentication, async (req, res) => {
   const Access = await authorization(req, res, Permission.CREATE_PRODUCT);
   if (!Access)
     return res.json({
       success: false,
       message: "شما به این بخش دسترسی ندارید",
     });
  create_product_variant(req, res)
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/products");
  },
  filename: (req, file, cb) => {
    // گرفتن نام اصلی فایل و پسوند آن
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);

    // فقط نام پایه را نگه می‌دارد
    const finalName = baseName + ext; // یا می‌توانید فقط baseName یا هر شیوه دیگری

    const filePath = path.join("public/img/products", finalName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    req.body.file_base_name = baseName;

    cb(null, finalName);
  },
});

const upload = multer({ storage });

router.post("/img/upload", authentication, upload.single("file"), async (req, res) => {
   const Access = await authorization(req, res, Permission.UPLOAD_IMG);
   if (!Access)
     return res.json({
       success: false,
       message: "شما به این بخش دسترسی ندارید",
     });
    await upload_product_img(req, res);
});

router.get("/img/:name", (req, res) => {
  const images = fs.readdirSync(path.resolve(__dirname, "../public/img/products"));
  const resolveImg = images.find((file) => file.startsWith(req.params.name + "."));
  res.sendFile(path.resolve("public/img/products/" + resolveImg));
});

router.get("/all", get_products);

module.exports = router;
