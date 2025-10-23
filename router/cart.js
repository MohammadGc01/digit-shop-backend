"use strict";

const { authentication } = require("../middleware/auth");
const router = require("express").Router();

router.post("/add", authentication, async (req, res) => {
    
})



module.exports = router 