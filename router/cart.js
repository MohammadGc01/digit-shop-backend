"use strict";

const { add_item, get_cart_item, update_count } = require("../controller/cart_controller");
const { authentication } = require("../middleware/auth");
const router = require("express").Router();

router.post("/add", authentication, async (req, res) => {
    add_item(req, res)
})

router.get("/", authentication, async (req, res) => {
    get_cart_item(req, res)
})

router.put("/update/count/:id", authentication, async (req, res) => {
    update_count(req, res)
})

module.exports = router