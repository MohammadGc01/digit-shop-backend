"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");

const user_api = require("./router/user");
const product_api = require("./router/product");
const cart_api = require("./router/cart");

app.use(cors());
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use("/user", user_api);
app.use("/product", product_api);
app.use("/cart", cart_api);

app.listen(4000, () => {
  console.log("app start http://localhost:3000/");
});
